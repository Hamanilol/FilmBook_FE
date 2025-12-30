import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import "./App.css"
import SignIn from "./pages/Signin.jsx"
import Register from "./pages/Register"
import { CheckSession } from "./services/Auth.js"
import Ticket from "./components/Ticket"
import Feed from "./pages/Feed"
import MovieDetails from "./pages/MovieDetails"
import Favorited from "./pages/Favorited"
import Nav from "./components/Navbar"
import Client from "./services/api"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  const [tickets, setTicket] = useState([])

  useEffect(() => {
    const getTicket = async () => {
      try {
        let response = await Client.get("/ticket")
        setTicket(response.data)
      } catch (err) {
        console.log("Error fetching tickets:", err)
      }
    }

    getTicket()
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed user={user} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorited" element={<Favorited />} />
          <Route
            path="/tickets"
            element={<Ticket tickets={tickets} setTicket={setTicket} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
