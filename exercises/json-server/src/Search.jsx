const Search = ({ setQuery, setHideNotStocked }) => {
	return (
		<form>
			<input type="text" onChange={(event) => { setQuery(event.target.value) }} />
			<input type="checkbox" onClick={(event) => { setHideNotStocked(event.target.checked) }} />
		</form>
	);
};

export default Search;
