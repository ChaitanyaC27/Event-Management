import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    e.target.style.backgroundColor = value ? "#fff3cd" : "#ffffff";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/contacts", formData);

      Swal.fire({
        title: "✅ Message Sent!",
        text: "Your message has been sent successfully. We'll contact you soon!",
        icon: "success",
        confirmButtonColor: "#f8b400",
        background: "#fffaf0",
        timer: 3000,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", contact: "", query: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "❌ Oops!",
        text: "Something went wrong. Please try again later.",
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
          transition={{ duration: 0.6 }}
        >
          <h2 className="fw-bold text-warning">Contact Us</h2>
          <p className="text-dark">
            Have a question or want to plan your next event? Fill out the form
            below, we’d love to hear from you!
          </p>
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
              transition={{ duration: 0.6 }}
            >
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  
                  {[ 
                    { label: "Full Name", name: "name", type: "text", rows: 1 },
                    { label: "Email Address", name: "email", type: "email", rows: 1 },
                    { label: "Contact Number", name: "contact", type: "tel", rows: 1 },
                    { label: "Your Query", name: "query", type: "textarea", rows: 4 },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      className="mb-3 text-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <label className="form-label fw-semibold">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          className="form-control"
                          rows={field.rows}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          className="form-control"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        />
                      )}
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
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </motion.div>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
