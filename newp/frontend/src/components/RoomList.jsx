import React from "react";
import RoomCard from "./RoomCard";

function RoomList({ rooms }) {
  return (
    <div className="room-list-container">
      <h2>Meeting Rooms</h2>

      {rooms.length === 0 ? (
        <p>No meeting rooms available.</p>
      ) : (
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomList;
