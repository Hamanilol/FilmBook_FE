const Movie = ({ movie, onClick }) => {
  return (
    <div className="movie">
      <div className="img-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
      </div>
      <div className="info-wrapper flex-col">
        <h3>{movie.title}</h3>
        <p>{movie.rating}</p>
      </div>
    </div>
  )
}

export default Movie