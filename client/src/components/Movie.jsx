const Movie = ({ movie }) => {
  return (
    <div className="movie" onClick={movie.onClick}>
      <div className="img-wrapper">
        <img src={movie.background_image}></img>
      </div>
      <div className="info-wrapper flex-col">
        <h3>{movie.name}</h3>
        <p>{movie.rating}</p>
        <p>{movie.length}</p>
      </div>
    </div>
  )
}

export default Movie
