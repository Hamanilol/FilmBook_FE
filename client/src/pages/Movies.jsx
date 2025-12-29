import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Movie from "../components/Movie"
import { getPopularMovies } from "../services/tmdb"

const Movies = () => {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getPopularMovies()
        setMovies(moviesData)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }
    fetchMovies()
  }, [])

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <div>
      <h2>Movies</h2>
      <section className="container-grid">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            onClick={() => handleMovieClick(movie.id)}
          />
        ))}
      </section>
    </div>
  )
}

export default Movies