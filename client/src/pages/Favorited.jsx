import { useState, useEffect } from "react"
import { GetFavorites, DeleteFavorite } from "../services/favorited"
import { getMovieDetails } from "../services/tmdb"
import Movie from "../components/Movie"
import { useNavigate } from "react-router-dom"
import Nav from "../components/Navbar"

const Favorited = ({ user, handleLogOut }) => {
  const [favorites, setFavorites] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true) // New loading state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavorites = async () => { // Fetch favorite records
      try {
        const favs = await GetFavorites();
        setFavorites(favs);

        if (favs.length === 0) { // in case there are no favorites
          setMovies([]);
          setLoading(false);
          return;
        }

        // Create array of promises using .map()
        const movie = favs.map(fav => getMovieDetails(fav.movie));

        // Wait for each promise and collect results
        const moviesData = [];
        for (let i = 0; i < movie.length; i++) {
          const movie = await movie[i];
          moviesData.push(movie);
        }

        setMovies(moviesData); // set movies state
        setLoading(false); // turn off loading
      } catch (error) {
        console.error("Error fetching favorites:", error); // handle error
        setLoading(false);
      }
    };

    fetchFavorites(); // initiate fetch on component mount
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`) // navigate to movie details page 
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

  if (loading) { // show loading state
    return (
      <div>
        <Nav user={user} handleLogOut={handleLogOut} />
        <h2>Your Favorited Movies</h2> // keep the header
        <p>Loading favorites...</p> // show loading message
      </div>
    )
  }

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} /> // navigation bar
      <h2>Your Favorited Movies</h2>
      <p>Favorites: {favorites.length}, Movies loaded: {movies.length}</p>
      {movies.length === 0 ? ( // in case no favorited movies display message
        <p>No favorited movies yet.</p>
      ) : ( // else display favorited movies
        <section className="container-grid">
          {movies.map((movie, index) => (
            <div key={movie.id}>
              <Movie
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />
              <button onClick={() => handleRemoveFavorite(favorites[index]._id)}>Remove from Favorites</button> // button to remove from favorites based on index
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default Favorited
