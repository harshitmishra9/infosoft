const db = require("../config/db");

const getBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(
      "SELECT * FROM bookings ORDER BY start_time",
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { room_id, title, organizer_email, attendees, start_time, end_time } =
      req.body;

    if (
      !room_id ||
      !title ||
      !organizer_email ||
      !attendees ||
      !start_time ||
      !end_time
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (new Date(end_time) <= new Date(start_time)) {
      return res.status(400).json({
        message: "End time must be after start time",
      });
    }

    const [rooms] = await db.query("SELECT * FROM rooms WHERE id = ?", [
      room_id,
    ]);

    if (rooms.length === 0) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (attendees > rooms[0].capacity) {
      return res.status(400).json({
        message: "Room capacity exceeded",
      });
    }

    const [conflicts] = await db.query(
      `SELECT * FROM bookings
             WHERE room_id = ?
             AND status = 'confirmed'
             AND start_time < ?
             AND end_time > ?`,
      [room_id, end_time, start_time],
    );

    if (conflicts.length > 0) {
      return res.status(409).json({
        message: "Room is already booked",
      });
    }

    const [result] = await db.query(
      `INSERT INTO bookings
            (room_id, title, organizer_email, attendees,
             start_time, end_time, status)
            VALUES (?, ?, ?, ?, ?, ?, 'confirmed')`,
      [room_id, title, organizer_email, attendees, start_time, end_time],
    );

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [bookings] = await db.query("SELECT * FROM bookings WHERE id = ?", [
      id,
    ]);

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (bookings[0].status === "cancelled") {
      return res.json({
        message: "Booking already cancelled",
      });
    }

    if (new Date(bookings[0].start_time) <= new Date()) {
      return res.status(409).json({
        message: "Cannot cancel a booking that has started",
      });
    }

    await db.query("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [
      id,
    ]);

    res.json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking,
};
