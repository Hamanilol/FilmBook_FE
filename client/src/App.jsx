import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import "./App.css"
import SignIn from "./pages/SiginIn"
import Register from "./pages/Register"
import { CheckSession } from "./services/Auth.js"
import Ticket from "./components/Ticket"
import MovieDetails from "./pages/MovieDetails"
import Favorited from "./pages/Favorited"

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
        let response = await axios.get("http://localhost:3000/ticket")
        setTicket(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getTicket()
  }, [])

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} handleLogOut={handleLogOut} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails user={user} handleLogOut={handleLogOut} />} />
          <Route path="/favorited" element={<Favorited user={user} handleLogOut={handleLogOut} />} />
        </Routes>
      </main>

      {/* <Ticket tickets={tickets} setTicket={setTicket} />
      <h1>Tickets:</h1>
      {tickets?.map((ticket) => (
        <div key={ticket._id}>
          <h3>Type: {ticket.ticketType}</h3>
          <p>Subject: {ticket.subject}</p>
          <p>Message: {ticket.message}</p>
        </div>
      ))} */}
    </>
  )
}

export default App
