<<<<<<< HEAD
import { useState, useEffect } from "react"
import { GetFavorites, DeleteFavorite } from "../services/favorited"
import { getMovieDetails } from "../services/tmdb"
import Movie from "../components/Movie"
import { useNavigate } from "react-router-dom"

const Favorited = () => {
  const [favorites, setFavorites] = useState([])
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await GetFavorites()
        setFavorites(favs)

        const moviePromises = favs.map(fav => getMovieDetails(fav.movie))
        const movieData = await Promise.all(moviePromises)
        setMovies(movieData)
      } catch (error) {
        console.error("Error fetching favorites:", error)
      }
    }
    fetchFavorites()
  }, [])

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  const handleRemoveFavorite = async (favId) => {
    try {
      await DeleteFavorite(favId)
      const index = favorites.findIndex(fav => fav._id === favId)
      setFavorites(favorites.filter((_, i) => i !== index))
      setMovies(movies.filter((_, i) => i !== index))
    } catch (error) {
      console.error("Error removing favorite:", error)
    }
  }

  return (
    <div>
      <h2>Your Favorited Movies</h2>
      {movies.length === 0 ? (
        <p>No favorited movies yet.</p>
      ) : (
        <section className="container-grid">
          {movies.map((movie, index) => (
            <div key={movie.id}>
              <Movie
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
              <button onClick={() => handleRemoveFavorite(favorites[index]._id)}>Remove from Favorites</button>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default Favorited
=======
// const Favorited = ({ favorited }) => {
//   return (
//     <div className="favorite" onClick={favorited.onClick}>
//       <div className="img-wrapper">
//         <img src={favorited.background_image}></img>


//       </div>
//     </div>
//   )
// }
>>>>>>> a441e05499e26156d2006dd3f81f86eb2156fc3a
