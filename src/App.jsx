import { useState } from "react";
import Navbar from "./components/Navbar";
import data from "./assets/data";
import Main from "./components/Main";
import Box from "./components/Box";
// import WatchBox from "./components/WatchBox";
import MovieList from "./components/MovieList";
import WatchedSummary from './components/WatchedSummary'
import WatchedList from './components/WatchedList'




export default function App() {
  const [movies, setMovies] = useState(data.tempMovieData);
  const [watched, setWatched] = useState(data.tempWatchedData);

 



  return (
    <>
      <Navbar movies={movies} />


      <Main movies={movies} watched={watched}>

        <Box >
          <MovieList movies={movies} />
        </Box>

        <Box>
          <div className="summary">
            <h2>Movies you watched</h2>
            <WatchedSummary watched={watched} />
          </div>
          <WatchedList watched={watched} />
        </Box>

      </Main>

    </>
  );
}
