const db = require("../config/db");

const getRooms = async (req, res) => {
  try {
    const [rooms] = await db.query("SELECT * FROM rooms");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRooms };
