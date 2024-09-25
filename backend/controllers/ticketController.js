const Ticket = require('../models/ticketModel');

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('createdBy', 'name email');
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket', error: error.message });
  }
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

