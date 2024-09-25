const Ticket = require('../models/ticketModel');

// Obtener todos los tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tickets' });
  }
};

// Crear un nuevo ticket
exports.createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({
      ...req.body,
      createdBy: req.user._id,
    });
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear ticket' });
  }
};

// Implementa las funciones para actualizar y eliminar tickets
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    if (ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar ticket' });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    if (ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    await ticket.remove();
    res.json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar ticket' });
  }
};

