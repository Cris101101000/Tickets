const Ticket = require('../models/ticketModel');

const getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const ticket = new Ticket({ title, description });
  await ticket.save();
  res.status(201).json(ticket);
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(id, { title, description, status }, { new: true });
  res.json(ticket);
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;
  await Ticket.findByIdAndDelete(id);
  res.status(204).end();
};

module.exports = {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
