const SearchBar = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      Find countries: <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBar;