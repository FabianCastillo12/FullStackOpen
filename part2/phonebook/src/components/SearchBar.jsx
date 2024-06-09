const SearchBar = ({ searchName, handleSearchChange }) => {
  return (
    <div className="search-bar">
      search a name: <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBar;
