const SearchBar = ({ searchName, handleSearchChange }) => {
  return (
    <>
      search a name: <input value={searchName} onChange={handleSearchChange} />
    </>
  );
};
