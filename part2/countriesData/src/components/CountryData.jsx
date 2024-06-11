import WeatherData from "./WeatherData.jsx";
const CountryData = ({ country }) => {
  const countryData = country[0];
  console.log(country);
  console.log(countryData.name.common);
  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <p>Capital: {countryData.capital}</p>
      <p>Population: {countryData.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(countryData.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={countryData.flags.png}
        alt="Flag"
        width="100"
        height="100"
      ></img>
      <WeatherData capital={countryData.capital}/>
    </div>
  );
};

export default CountryData;
