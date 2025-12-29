import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GetFavorites, DeleteFavorite } from "../services/favorited"
import { getMovieDetails } from "../services/tmdb"
import { POSTER_PATH } from "../../globals"
import Nav from "../components/Navbar"

const Favorited = ({ user, handleLogOut }) => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)

        const favoritesData = await GetFavorites()

        const moviesWithDetails = await Promise.all(
          favoritesData.map(async (favorite) => {
            try {
              const movieDetails = await getMovieDetails(favorite.movie)
              return {
                favoriteId: favorite._id,
                ...movieDetails
              }
            } catch (err) {
              console.error(`Error fetching movie ${favorite.movie}:`, err)
              return null
            }
          })
        )

        setFavorites(moviesWithDetails.filter(movie => movie !== null))
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
      setFavorites(favorites.filter(movie => movie.favoriteId !== favoriteId))
    } catch (err) {
      console.error("Error removing favorite:", err)
    }
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  if (loading) {
    return (
      <div>
        <Nav user={user} handleLogOut={handleLogOut} />
        <div className="movies">
          <h2>My Favorites</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <div className="movies">
        <h2>My Favorites</h2>

        {favorites.length === 0 ? (
          <div></div>
        ) : (
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
                      src={`${POSTER_PATH}${movie.poster_path}`}
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

                <button
                  className="btn-secondary remove-favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFavorite(movie.favoriteId)
                  }}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#666'
                  }}
                >
                  <i className="fa fa-trash"></i> Remove from Favorites
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default Favorited
