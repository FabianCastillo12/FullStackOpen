import { useState, useEffect } from "react";
import Persons from "./components/Persons.jsx";
import AddNewPerson from "./components/AddNewPerson.jsx";
import SearchBar from "./components/SearchBar.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

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

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
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

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
