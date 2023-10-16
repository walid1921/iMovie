import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import data from "./assets/data";
import Main from "./components/Main";
import Box from "./components/Box";
// import WatchBox from "./components/WatchBox";
import MovieList from "./components/MovieList";
import WatchedSummary from './components/WatchedSummary'
import WatchedList from './components/WatchedList'
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";


const KEY = '52788a36'

export default function App() {
  const [query, setQuery] = useState("new");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  console.log(query)

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))

  }


  useEffect(() => {

    if (query.length < 3) {
      setMovies([]);
      setError("")
      return
    }

    fetchData()
  }, [query])


  async function fetchData() {
    setIsLoading(true);
    setError("")
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

      // API Documentation https://www.omdbapi.com/

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.Response === 'False') throw new Error("Movie not found")

      setMovies(data.Search);
      setIsLoading(false)

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />


      <Main movies={movies} watched={watched}>

        <Box >
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} handleSelectedMovie={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? <MovieDetails
            selectedId={selectedId}
            handleCloseMovie={handleCloseMovie} handleAddWatched={handleAddWatched}
            watched={watched}
          /> :
            (<>
              <div className="summary">
                <h2>Movies you watched</h2>
                <WatchedSummary watched={watched} />
              </div>
              <WatchedList watched={watched} handleDeleteWatched={handleDeleteWatched} />
            </>)}
        </Box>

      </Main>

    </>
  );
}
