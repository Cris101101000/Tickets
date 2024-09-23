const API_URL = 'http://localhost:5000/api/tickets';

export const getTickets = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTicket = async (ticket) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
  return response.json();
};

export const updateTicket = async (id, ticket) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
  return response.json();
};

export const deleteTicket = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
