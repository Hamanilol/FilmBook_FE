import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AddFavorite } from "../services/favorited"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
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
    <div className="movie-details">
      <h2>{movie.title}</h2>

      <div className="movie-details-img">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>

      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>{movie.overview}</p>

      {isLoggedIn && <button onClick={handleFavorite}>Add to Favorites</button>}
    </div>
  )
}

export default MovieDetails
