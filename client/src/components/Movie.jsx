const Movie = ({ movie, onClick }) => {
  return (
    <div className="movie">
      <div className="img-wrapper" onClick={onClick}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
      </div>
      <div className="info-wrapper flex-col">
        <h3>{movie.title}</h3>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  )
}

export default Movie