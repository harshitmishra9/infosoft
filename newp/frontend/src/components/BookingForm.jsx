import React, { useState } from "react";

function BookingForm({ rooms, onBookingCreated }) {
  const [form, setForm] = useState({
    room_id: "",
    title: "",
    organizer_email: "",
    attendees: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onBookingCreated({
      ...form,
      attendees: Number(form.attendees),
      start_time: form.start_time.replace("T", " "),
      end_time: form.end_time.replace("T", " "),
    });

    setForm({
      room_id: "",
      title: "",
      organizer_email: "",
      attendees: "",
      start_time: "",
      end_time: "",
    });
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Meeting Room</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Meeting Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter meeting title"
            required
          />
        </div>

        <div className="form-group">
          <label>Organizer Email</label>
          <input
            type="email"
            name="organizer_email"
            value={form.organizer_email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Room</label>
          <select
            name="room_id"
            value={form.room_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a room</option>

            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} - Capacity: {room.capacity}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Number of Attendees</label>
          <input
            type="number"
            name="attendees"
            min="1"
            value={form.attendees}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          Book Room
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
