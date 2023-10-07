import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchBar from "./SearchBar";


function Navbar({movies}) {

  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <NumResults movies={movies} />
    </nav>
  )
}

export default Navbar
