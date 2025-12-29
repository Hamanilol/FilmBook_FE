import { POSTER_PATH } from "../../globals"

const Movie = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={onClick}>
      <div className="img-wrapper">
        <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="info-wrapper flex-col">
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
        <p>Release: {movie.release_date}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default Movie
