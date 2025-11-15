import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    e.target.style.backgroundColor = e.target.value ? "#fff3cd" : "#fff";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send data to JSON server
      await axios.post("http://localhost:3000/users", form);

      Swal.fire({
        title: "🎉 Signup Successful",
        text: "You can now login with your credentials.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: "#fffaf0",
        confirmButtonColor: "#f8b400",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error saving signup data:", error);
      Swal.fire({
        title: "❌ Signup Failed",
        text: "Could not save data. Please try again.",
        icon: "error",
        confirmButtonColor: "#f87171",
      });
    } finally {
      setLoading(false);
    }
  };

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
        className="position-absolute bg-warning rounded-circle"
        style={{
          width: 150,
          height: 150,
          top: "5%",
          left: "10%",
          opacity: 0.15,
          filter: "blur(60px)",
        }}
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="position-absolute bg-pink rounded-circle"
        style={{
          width: 200,
          height: 200,
          bottom: "10%",
          right: "5%",
          opacity: 0.15,
          filter: "blur(70px)",
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="container position-relative">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="fw-bold text-warning">Create an Account</h2>
          <p className="text-dark">Join us and start managing your events easily!</p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <motion.div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.85)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {["name", "email", "password"].map((field, i) => (
                    <motion.div
                      key={field}
                      className="mb-3 text-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <label className="form-label fw-semibold">
                        {field === "name"
                          ? "Full Name"
                          : field === "email"
                          ? "Email Address"
                          : "Password"}
                      </label>
                      <input
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        className="form-control"
                        placeholder={`Enter ${field}`}
                        value={form[field]}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    className="d-grid mt-3"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      type="submit"
                      className="btn btn-warning fw-bold py-2"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Signup"}
                    </button>
                  </motion.div>

                  <p className="mt-3 text-center">
                    Already have an account? <a href="/login">Login</a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
