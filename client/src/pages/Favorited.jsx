import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { GetFavorites, DeleteFavorite } from "../services/favorited"

const Favorited = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)

        const favoritesFromDB = await GetFavorites()
        const moviesWithDetails = await Promise.all(
          favoritesFromDB.map(async (favorite) => {
            try {
              const response = await axios.get(`http://localhost:3000/movies/${favorite.movie}`)
              const movieDetails = response.data
              return {
                favoriteId: favorite._id,
                id: movieDetails.id,
                title: movieDetails.title,
                backdrop_path: movieDetails.backdrop_path,
                vote_average: movieDetails.vote_average,
                release_date: movieDetails.release_date,
                genres: movieDetails.genres,
                overview: movieDetails.overview
              }
            } catch (err) {
              console.error(`Error fetching movie ${favorite.movie}:`, err)
              return null
            }
          })
        )

        const validMovies = moviesWithDetails.filter(movie => movie !== null)
        setFavorites(validMovies)

      } catch (err) {
        console.error("Error fetching favorites:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await DeleteFavorite(favoriteId)
      setFavorites(favorites.filter(movie => movie.favoriteId !== favoriteId)) // Update state to remove the movie from the list
    } catch (err) {
      console.error("Error removing favorite:", err)
    }
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  if (loading) {
    return (
      <div className="movies">
        <h2>My Favorites</h2>
      </div>
    )
  }

  return (
    <div className="movies">
      <h2>My Favorites</h2>
      <section className="container-grid">
        {favorites.map((movie) => (
          <div key={movie.favoriteId} className="favorite-movie-card">
            <div
              className="movie"
              onClick={() => handleMovieClick(movie.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="img-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="info-wrapper flex-col">
                <h3>{movie.title}</h3>
                <div>Rating: {movie.vote_average}</div>
                <div>Release: {movie.release_date}</div>
                {movie.genres && movie.genres.length > 0 && (
                  <div>Genres: {movie.genres.map(genre => genre.name).join(', ')}</div>
                )}
              </div>
            </div>

            <button className="btn-secondary remove-favorite-btn" onClick={() => handleRemoveFavorite(movie.favoriteId)}>
            Remove from Favorites </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Favorited
