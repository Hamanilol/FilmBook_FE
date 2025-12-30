import { useState, useEffect } from "react"
import axios from "axios"
import Movie from "../components/Movie"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Navbar"
import { getPopularMovies } from "../services/tmdb"

const Home = ({ user, handleLogOut }) => {
  let navigate = useNavigate()
  const [movies, setMovie] = useState([])
  const getMovie = async () => {
    const response = await axios.get("http://localhost:3000/movies")
    setMovie(response.data)
  }

  useEffect(() => {
    getMovie()
  }, [])
  return (
    <div>
      <Nav/>
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
