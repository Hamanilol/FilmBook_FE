import { useState } from "react"
import axios from "axios"
import Movie from "../components/Movie"
import { useNavigate } from "react-router-dom"

const API_KEY = import.meta.env.VITE_KEY

const Home = () => {
  let navigate = useNavigate()
  const [movies, setMovie] = useState([])
  const getMovie = async () => {
    const response = await axios.get(`${API_KEY}`) //add api route here
    setMovie(response.data.results)
  }
  return (
    <div>
      <div className="movies">
        <h2>Movies</h2>
        <button onClick={() => navigate("/movies")}>Browse Movies</button>
        <section className="container-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </section>
        <section>
          <button onClick={() => navigate("/signin")}>Sign in here!</button>
        </section>
        <section>
          <button onClick={() => navigate("/register")}> Register!</button>
        </section>
      </div>
    </div>
  )
}

export default Home
