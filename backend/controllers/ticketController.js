const Ticket = require('../models/ticketModel');

// Get all tickets
exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const { title, description, status } = req.body;
  const ticket = new Ticket({ title, description, status });
  await ticket.save();
  res.status(201).json(ticket);
};

// Get a single ticket
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    if (req.user.role === 'usuario' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ticket', error: error.message });
  }
};

// Update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status, assignedTo }, { new: true });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket', error: error.message });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    await ticket.remove();
    res.json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ticket', error: error.message });
  }
};

