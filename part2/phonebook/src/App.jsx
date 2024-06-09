import { useState, useEffect } from "react";
import Persons from "./components/Persons.jsx";
import AddNewPerson from "./components/AddNewPerson.jsx";
import SearchBar from "./components/SearchBar.jsx";
import personsService from "./services/persons.js";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

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
    console.log(persons)
    }
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );



  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    let newId = uuidv4(); 
    while (persons.some(person => person.id === newId)) {
      newId = uuidv4();
    }

    const personObject = {
      name: newName,
      id: newId,
      number: newNumber
    };

    if (newName === "" || newNumber === "") {
      window.alert("Name or Number is missing");
      return;
    }

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    if (persons.find((person) => person.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`);
      return;
    }

    personsService.createPerson(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      console.log(persons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow} onDelete={handleDeletePerson}/>
    </div>
  );
};

export default App;
