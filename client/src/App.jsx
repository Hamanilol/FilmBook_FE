import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

import Ticket from "./components/Ticket"

const App = () => {
  const [tickets, setTicket] = useState([])

  useEffect(() => {
    const getTicket = async () => {
      try {
        let response = await axios.get("http://localhost:3001/issues")
        setTicket(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getTicket()
  }, [])

  return (
    <>
      <Form Ticket={tickets} setTicket={setTicket} />
      <h1>Tickets:</h1>
      {tickets?.map((ticket) => (
        <div key={ticket._id}>
          <h3>Type: {ticket.ticketType}</h3>
          <p>Subject: {ticket.subject}</p>
          <p>Message: {ticket.message}</p>
        </div>
      ))}
    </>
  )
}

export default App
