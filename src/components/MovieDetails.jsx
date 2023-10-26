import { useEffect, useState } from 'react'

import StarRating from './StarRating'
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useKey from './useKey';
import axios from 'axios';
const KEY = '52788a36'


function MovieDetails({ selectedId, handleCloseMovie, handleAddWatched, watched }) {
  const [movie, setMovie] = useState({})

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)

  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie

  function handleAdd() {

    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating
    }

    handleAddWatched(newWatchedMovie)
    handleCloseMovie()
  }


  // Handling keypress event 
useKey('Escape', handleCloseMovie)



  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      setError("")
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

        const data = response.data;

        if (data.Response === 'False') throw new Error("Movie not found")

        setMovie(data)
        setIsLoading(false)

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false)
      }

    }

    fetchMovieDetails()
  }, [selectedId,])





  return (

    <div className="details" >
      {isLoading && <Loader />}
      {!isLoading && !error &&
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie} > &larr; </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span>{imdbRating} IMDb rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && <button className='btn-add' onClick={handleAdd}>+ Add to list</button>}
                </>
                :
                <p>You already rated this movie {watchedUserRating} <span>⭐</span></p>}

            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
      {error && <ErrorMessage message={error} />}


    </div >
  )
}

export default MovieDetails
