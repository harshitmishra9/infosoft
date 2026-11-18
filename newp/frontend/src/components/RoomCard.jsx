import React from "react";

function RoomCard({ room }) {
  return (
    <div className="room-card">
      <h3>{room.name}</h3>

      <p>
        <strong>Capacity:</strong> {room.capacity} people
      </p>

      <p>
        <strong>Floor:</strong> {room.floor}
      </p>

      <p>
        <strong>Amenities:</strong> {room.amenities}
      </p>
    </div>
  );
}

export default RoomCard;
