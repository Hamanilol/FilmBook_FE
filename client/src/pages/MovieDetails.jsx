import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails } from "../services/tmdb"
import { AddFavorite } from "../services/favorited"
import { POSTER_PATH } from "../../../../FilmBook_BE/globals.js"
import Nav from "../components/Navbar"

const MovieDetails = ({ user, handleLogOut }) => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("token")

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id)
        setMovie(movieData)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }
    fetchMovie()
  }, [id])

  const handleFavorite = async () => {
    try {
      setIsAnimating(true)
      await AddFavorite(id)
      setTimeout(() => {
        setIsAnimating(false)
        alert("Added to favorites!")
      }, 700)
    } catch (error) {
      console.error("Error adding to favorites:", error)
      setIsAnimating(false)
    }
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <div className={isAnimating ? "animate-like" : ""}>
        <h2>{movie.title}</h2>
        <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <p>Rating: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>
        {movie.genres && movie.genres.length > 0 && (
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        )}
        <p>Overview: {movie.overview}</p>
        {isLoggedIn && (
          <div className="like-content">
            <span>Add this movie to your favorites?</span>
            <button className="btn-secondary" onClick={handleFavorite}>
              <i className="fa fa-heart"></i> Add to Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
