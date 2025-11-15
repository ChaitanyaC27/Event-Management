import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; // adjust path to your context

const BookingsCards = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "⚠️ Login Required",
        html: "You must be <strong>logged in</strong> to view My Bookings.",
        icon: "warning",
        confirmButtonText: "Login",
        backdrop: `
          rgba(0,0,0,0.7)
          left top
          no-repeat
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

  const fetchBookings = async () => {
    if (!user) return; // prevent fetch if not logged in
    try {
      const res = await axios.get("http://localhost:3000/bookings");
      setBookings(res.data);
    } catch (error) {
      Swal.fire("❌ Error", "Cannot load bookings", "error");
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Booking?",
      text: "This cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0ad4e",
      cancelButtonColor: "#d9534f",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/bookings/${id}`);
        Swal.fire("Deleted!", "Booking removed", "success");
        fetchBookings();
      }
    });
  };

  if (!user) return null; // don't render if user is not logged in

  return (
    <section
      className="py-5 position-relative"
      style={{
        background: "linear-gradient(135deg, #fffbe6, #ffe6f0, #fff9e6)",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Circles */}
      <motion.div
        className="position-absolute rounded-circle bg-warning"
        style={{
          width: 140,
          height: 140,
          top: "5%",
          left: "10%",
          opacity: 0.15,
          filter: "blur(70px)",
        }}
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="position-absolute rounded-circle bg-danger"
        style={{
          width: 180,
          height: 180,
          bottom: "10%",
          right: "5%",
          opacity: 0.15,
          filter: "blur(80px)",
        }}
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="container position-relative">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fw-bold text-warning display-5">Your Bookings</h2>
          <div
            className="mx-auto my-2"
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#ffc107",
              borderRadius: "5px",
            }}
          ></div>
          <p className="text-dark mt-2">All your upcoming events at a glance</p>
        </motion.div>

        <div className="row justify-content-center g-4">
          {bookings.length > 0 ? (
            bookings.map((b, i) => (
              <motion.div
                key={b.id}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="p-3 shadow-lg border-0"
                  style={{
                    borderRadius: "25px",
                    backdropFilter: "blur(15px)",
                    background: "rgba(255, 255, 255, 0.95)",
                    minHeight: "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s",
                  }}
                >
                  {/* Name & Email */}
                  <div className="text-center mb-3">
                    <h5 className="fw-bold text-success">{b.fullName}</h5>
                    <span className="text-dark px-3 py-1 mt-1 fw-bold">{b.email}</span>
                  </div>

                  {/* Services */}
                  <div className="p-3 mb-2 rounded bg-primary bg-opacity-10">
                    <p className="mb-1"><strong>Event:</strong> {b.eventType}</p>
                    <p className="mb-1"><strong>Decoration:</strong> {b.decoration}</p>
                    <p className="mb-1"><strong>Catering:</strong> {b.catering}</p>
                    {b.catering !== "No" && (
                      <>
                        <p className="mb-1"><strong>Thali:</strong> {b.thaliType}</p>
                        <p className="mb-1"><strong>People:</strong> {b.peopleCount}</p>
                      </>
                    )}
                    <p className="mb-1"><strong>Music:</strong> {b.music}</p>
                    <p className="mb-1"><strong>Photographer:</strong> {b.photographer || "—"}</p>
                  </div>

                  {/* Budget + Location + Date/Time */}
                  <div className="p-3 mb-2 rounded text-center bg-warning bg-opacity-10">
                    <p className="mb-1"><strong>Budget:</strong> {b.budgetRange}</p>
                    <p className="mb-1"><strong>Location:</strong> {b.location}</p>
                    <p className="mb-1"><strong>Date & Time:</strong> {b.date} — {b.time}</p>
                  </div>

                  {/* Special Requests */}
                  <div className="p-3 mb-3 rounded bg-danger bg-opacity-10">
                    <p className="mb-0"><strong>Special Requests / Notes:</strong> {b.specialRequest || "—"}</p>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center gap-3">
                    <Link
                      to="/editbooking"
                      state={{ booking: b }}
                      className="btn btn-warning px-4 py-1 rounded-pill"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger px-4 py-1 rounded-pill"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <h5 className="text-center text-muted mt-4">No bookings found</h5>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingsCards;
