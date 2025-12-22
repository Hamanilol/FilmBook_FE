import { useState } from "react"
import axios from "axios"
import Movie from "../components/Movie"

const API_KEY = import.meta.env.VITE_RAWG_KEY

const Home = () => {
  const [movies, setMovie] = useState([])
  const getMovie = async () => {
    const response = await axios.get(`${API_KEY}`) //add api route here
    setMovie(response.data.results)
  }
  return (
    <div>
      <div className="movies">
        <h2>Movies</h2>
        <section className="container-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
