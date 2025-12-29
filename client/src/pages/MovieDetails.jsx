import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMovieDetails } from "../services/tmdb"
import { AddFavorite } from "../services/favorited"
import { POSTER_PATH } from "../../globals"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()

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
      await AddFavorite(id)
      navigate("/favorited")
    } catch (error) {
      console.error("Error adding to favorites:", error)
    }
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      <p>Rating: {movie.vote_average}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <button onClick={handleFavorite}>Add to Favorites</button>
    </div>
  )
}

export default MovieDetails