import { useState, useEffect } from "react";
import axios from "axios";
import countriesServices from "./services/countries.js";
import SearchBar from "./components/SearchBar.jsx";
import CountryData  from "./components/CountryData.jsx";
import Countries from "./components/Countries.jsx";
import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchName.toLowerCase())
      )
    );
    console.log(countriesToShow);
  };

  useEffect(() => {
    countriesServices.getCountries().then((response) => {
      setCountries(response);
      console.log("render", response.length, "countries");
      console.log(countries);
    });
  }, []);

  return (
    <>
      <h1>Countries</h1>
      <SearchBar
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      {countriesToShow.length === 1 ? (
        <CountryData country={countriesToShow} />
      ) : null}
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <Countries countries={countriesToShow} setCountriesToShow={setCountriesToShow}/>
      )}
    </>
  );
}

export default App;
