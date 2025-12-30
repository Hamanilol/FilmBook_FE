import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { AddFavorite } from "../services/favorited"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("token")

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`)
        setMovie(response.data)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }
    fetchMovie()
  }, [id])

  const handleFavorite = async () => {
    try {
      await AddFavorite(id)
    } catch (error) {
      console.error("Error adding to favorites:", error)
    }
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
      <p>Rating: {movie.vote_average}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      {isLoggedIn && (
        <div>
          <button onClick={handleFavorite}>
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieDetails
