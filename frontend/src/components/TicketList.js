import React from 'react';

const TicketList = ({ tickets, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <button onClick={() => onUpdate(ticket._id, { ...ticket, status: 'closed' })}>Close</button>
            <button onClick={() => onDelete(ticket._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
