const TicketForm = ({ form, tickets, onChange, onSubmit, onGetTickets }) => {
  return (
    <div className="ticket-form">
      <button type="button" onClick={onGetTickets}>
        My Tickets
      </button>

      <form onSubmit={onSubmit}>
        <select name="ticketType" value={form.ticketType} onChange={onChange}>
          <option value="" disabled>
            Select Ticket Type
          </option>
          <option value="sign-in">Sign-in Issues</option>
          <option value="bug">Bug</option>
          <option value="suggestion">Suggestion</option>
        </select>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={onChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={onChange}
        />

        <button type="submit">Send</button>
      </form>

      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <p>
            <strong>Ticket Type:</strong> {ticket.ticketType}
          </p>
          <p>
            <strong>Subject:</strong> {ticket.subject}
          </p>
          <p>
            <strong>Message:</strong> {ticket.message}
          </p>
        </div>
      ))}
    </div>
  )
}

export default TicketForm
