const Countries = ({ countries, setCountriesToShow }) => {
  if (countries.length === 1) {
    return null;
  }
  console.log(countries)
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.official}>
            {country.name.official}
            <button onClick={() => setCountriesToShow([country])}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
