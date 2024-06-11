import { useState, useEffect } from "react";
import './App.css';
import Persons from "./components/Persons.jsx";
import AddNewPerson from "./components/AddNewPerson.jsx";
import SearchBar from "./components/SearchBar.jsx";
import personsService from "./services/persons.js";
import { v4 as uuidv4 } from "uuid";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const hook = () => {
    console.log("effect");
    personsService.getPersons().then((savedPersons) => {
      setPersons(savedPersons);
    });
    console.log("render", persons.length, "notes");
  };

  useEffect(hook, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const handleDeletePerson = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
      console.log(persons);
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    let newId = uuidv4();
    while (persons.some((person) => person.id === newId)) {
      newId = uuidv4();
    }

    const personObject = {
      name: newName,
      id: newId,
      number: newNumber,
    };

    if (newName === "" || newNumber === "") {
      window.alert("Name or Number is missing");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService
          .updateNumber(existingPerson.id, updatedPerson).then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setErrorType("success")
            setErrorMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName("");
            setNewNumber("");
          }).catch((error) => {
            setErrorType("error")
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        return;
      }
    }

    personsService.createPerson(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      console.log(persons);
    });
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Notification message={errorMessage} errorType={errorType}/>
      <SearchBar
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a Number</h2>
      <AddNewPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
