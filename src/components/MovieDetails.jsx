import { useEffect, useState } from 'react'

import StarRating from './StarRating'
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const KEY = '52788a36'


function MovieDetails({ selectedId, handleCloseMovie }) {
  const [movie, setMovie] = useState({})

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieDetails()
  }, [selectedId])



  async function fetchMovieDetails() {
    setIsLoading(true);
    setError("")
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

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


  return (

    <div className="details" >
      {isLoading && <Loader />}
      {!isLoading && !error &&
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie} > &larr; </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>{movie.Released} &bull; {movie.Runtime}</p>
              <p>{movie.Genre}</p>
              <p><span>⭐</span>{movie.imdbRating} IMDb rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating size={24} maxRating={10} />

            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>}
      {error && <ErrorMessage message={error} />}


    </div >
  )
}

export default MovieDetails
