import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchBar from "./SearchBar";


function Navbar({movies, query, setQuery}) {

  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  )
}

export default Navbar
