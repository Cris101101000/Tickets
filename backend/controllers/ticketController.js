const Ticket = require('../models/ticketModel');

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === 'usuario') {
      tickets = await Ticket.find({ user: req.user.id });
    } else {
      tickets = await Ticket.find();
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tickets', error: error.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user.id
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el ticket', error: error.message });
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
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    if (req.user.role === 'usuario' && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    const { title, description, priority, status } = req.body;
    ticket = await Ticket.findByIdAndUpdate(req.params.id, 
      { title, description, priority, status }, 
      { new: true, runValidators: true }
    );
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el ticket', error: error.message });
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

