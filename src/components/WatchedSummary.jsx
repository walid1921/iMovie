

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedSummary({ watched }) {

  const avgImdbRating = watched?.length ? average(watched.map((movie) => movie.imdbRating)) : 0;
  const avgUserRating = watched?.length ? average(watched.map((movie) => movie.userRating)) : 0;
  const avgRuntime = watched?.length ? average(watched.map((movie) => movie.runtime)) : 0;


  return (
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime.toFixed(2)} min</span>
      </p>
    </div>
  )
}

export default WatchedSummary
