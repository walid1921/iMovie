

function MovieList({ movies, handleSelectedMovie }) {
  return (
    <ul className="list list-movies flex justify-center flex-wrap gap-2 my-14">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} className="h-[300px] w-[200px] rounded-xl hover:opacity-50 transition-all ease-in-out duration-500 "/>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
