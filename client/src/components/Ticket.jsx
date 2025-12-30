import { useState } from "react"
import axios from "axios"
import TicketForm from "../pages/TicketForm"

const Ticket = ({ tickets, setTicket }) => {
  const [form, setForm] = useState({
    ticketType: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const sendTicket = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    const res = await axios.post("http://localhost:3000/ticket", form, {
      headers: { Authorization: `Bearer ${token}` },
    })

    setTicket([...tickets, res.data])
    setForm({ ticketType: "", subject: "", message: "" })
  }

  const getMyTickets = async () => {
    const token = localStorage.getItem("token")

    const res = await axios.get("http://localhost:3000/ticket", {
      headers: { Authorization: `Bearer ${token}` },
    })

    setTicket(res.data)
  }

  return (
    <TicketForm
      form={form}
      tickets={tickets}
      onChange={handleChange}
      onSubmit={sendTicket}
      onGetTickets={getMyTickets}
    />
  )
}

export default Ticket
