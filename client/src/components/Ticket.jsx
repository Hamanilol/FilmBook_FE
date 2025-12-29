import { useState } from "react"
import axios from "axios"

const Form = ({ tickets, setTicket }) => {
  const initialState = {
    ticketType: "",
    subject: "",
    message: "",
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post(
      "http://localhost:3000/tickets",
      formState
    )
    let ticketList = [...tickets]
    ticketList.push(response.data)
    setFormState(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ticketType">Type of Issue:</label>
      <select
        name="ticketType"
        onChange={handleChange}
        value={formState.ticketType}
      >
        <option value="" disabled defaultValue>
          Select Ticket Type
        </option>
        <option value="sign-in ">Sign-in Issues</option>
        <option value="bug">Bugs in website</option>
        <option value="Suggestion">Suggestion</option>
      </select>
      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        name="subject"
        onChange={handleChange}
        value={formState.subject}
        autoComplete="off"
      />
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        cols="30"
        rows="10"
        onChange={handleChange}
        value={formState.message}
        autoComplete="off"
      ></textarea>
      <button type="submit">Send</button>
    </form>
  )
}

export default Form
