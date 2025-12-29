import axios from "axios"
import { API_KEY, BASE_URL } from "../../globals"

const TMDBClient = axios.create({ baseURL: BASE_URL })

export const getPopularMovies = async () => {
  try {
    const res = await TMDBClient.get(`/movie/popular?api_key=${API_KEY}`)
    return res.data.results
  } catch (error) {
    throw error
  }
}

export const getMovieDetails = async (id) => {
  try {
    const res = await TMDBClient.get(`/movie/${id}?api_key=${API_KEY}`)
    return res.data
  } catch (error) {
    throw error
  }
}