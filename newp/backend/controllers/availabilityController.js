const db = require("../config/db");

const getAvailability = async (req, res) => {
  try {
    const { date, start, end, minCapacity } = req.query;

    if (!date || !start || !end) {
      return res.status(400).json({
        message: "Date, start time and end time are required",
      });
    }

    const [rooms] = await db.query(
      `SELECT * FROM rooms
             WHERE capacity >= ?
             AND id NOT IN (
                 SELECT room_id FROM bookings
                 WHERE status = 'confirmed'
                 AND DATE(start_time) = ?
                 AND start_time < ?
                 AND end_time > ?
             )
             ORDER BY capacity ASC`,
      [minCapacity || 1, date, `${date} ${end}`, `${date} ${start}`],
    );

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAvailability };
