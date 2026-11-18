import React from "react";

function BookingList({ bookings, onCancelBooking }) {
  return (
    <div className="booking-list-container">
      <h2>Meeting Bookings</h2>

      {bookings.length === 0 ? (
        <p className="empty-message">No bookings available.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-header">
                <h3>{booking.title}</h3>

                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </div>

              <p>
                <strong>Room:</strong> {booking.room_name || booking.room_id}
              </p>

              <p>
                <strong>Organizer:</strong> {booking.organizer_email}
              </p>

              <p>
                <strong>Attendees:</strong> {booking.attendees}
              </p>

              <p>
                <strong>Start:</strong>{" "}
                {new Date(booking.start_time).toLocaleString()}
              </p>

              <p>
                <strong>End:</strong>{" "}
                {new Date(booking.end_time).toLocaleString()}
              </p>

              {booking.status !== "cancelled" && (
                <button
                  className="cancel-button"
                  onClick={() => onCancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
