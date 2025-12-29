import { useState, useEffect } from "react"
import axios from "axios"
import Movie from "../components/Movie"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Navbar"
import { getPopularMovies } from "../services/tmdb"

const Home = ({ user, handleLogOut }) => {
  let navigate = useNavigate()
  const [movies, setMovie] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getPopularMovies()
        console.log("Fetched movies:", movieData)
        setMovie(movieData)
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
      <Nav user={user} handleLogOut={handleLogOut} />
      <div className="movies">
        <h2>Movies</h2>
        <section className="container-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
