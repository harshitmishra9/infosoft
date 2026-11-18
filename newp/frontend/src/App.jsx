import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import RoomList from "./components/RoomList";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API}/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to load rooms");
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchRooms(), fetchBookings()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookingCreated = async (bookingData) => {
    try {
      await axios.post(`${API}/bookings`, bookingData);

      toast.success("Booking created successfully! 🎉");

      await fetchBookings();

      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Booking failed. Please try again.";

      toast.error(errorMessage);

      return false;
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      await axios.delete(`${API}/bookings/${bookingId}`);

      toast.success("Booking cancelled successfully!");

      await fetchBookings();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Cancellation failed.";

      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="loading">Loading Meeting Room Booking System...</div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Meeting Room Booking System</h1>
        <p>Manage meeting rooms and bookings easily</p>
      </header>

      <main className="main-container">
        <section className="rooms-section">
          <RoomList rooms={rooms} />
        </section>

        <section className="booking-section">
          <BookingForm rooms={rooms} onBookingCreated={handleBookingCreated} />
        </section>

        <section className="bookings-section">
          <BookingList
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
