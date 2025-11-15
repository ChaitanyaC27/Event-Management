import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/Event.jpg"; // 🖼️ Add a nice elegant image here (like team, event setup, or decoration)
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section
      className="py-5 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fffbe6, #ffe6f0, #fff9e6)",
        minHeight: "100vh",
      }}
    >
      {/* ✨ Floating background glow */}
      <motion.div
        className="position-absolute rounded-circle bg-warning"
        style={{
          width: "250px",
          height: "250px",
          top: "120px",
          left: "-100px",
          opacity: 0.25,
          filter: "blur(90px)",
          zIndex: 0,
        }}
        animate={{ y: [0, 25, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="position-absolute rounded-circle bg-warning"
        style={{
          width: "200px",
          height: "200px",
          bottom: "100px",
          right: "-80px",
          opacity: 0.18,
          filter: "blur(70px)",
          zIndex: 0,
        }}
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* 🌟 Heading */}
        <motion.h2
          className="fw-bold text-center text-warning mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Event Pro
        </motion.h2>

        <motion.p
          className="text-dark text-center mb-5 mx-auto"
          style={{ maxWidth: "700px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Turning moments into lifelong memories. Event Pro is your trusted
          partner in crafting extraordinary celebrations filled with joy,
          elegance, and perfection.
        </motion.p>

        {/* 🌸 Two-column layout */}
        <div className="row align-items-center g-5">
          {/* Left: Image */}
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="shadow-lg overflow-hidden"
              style={{
                borderRadius: "25px",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              <img
                src={aboutImg}
                alt="About Event Pro"
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "25px",
                }}
              />
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            className="col-md-6 text-md-start text-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="fw-bold text-dark mb-3">
              We Create Experiences, Not Just Events
            </h4>
            <p className="text-dark mb-4" style={{ lineHeight: "1.7" }}>
              At <span className="text-dark fw-semibold">Event Pro</span>, we
              specialize in curating unforgettable events from dreamy weddings
              and lively birthdays to sophisticated corporate gatherings. Our
              expert team ensures every detail reflects your vision, style, and
              story.
            </p>
            <p className="text-dark mb-4" style={{ lineHeight: "1.7" }}>
              With creativity, precision, and passion, we bring your ideas to
              life transforming ordinary occasions into cherished memories.
              Let’s make your next event truly special.
            </p>

            {/* 💛 Button */}
            <Link to="/booknow">
            <motion.button
              whileHover={{
                scale: 1.05,
                background:
                  "linear-gradient(90deg, #ffca28, #ffc107, #ffb300)",
                boxShadow: "0 6px 15px rgba(255, 193, 7, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="btn fw-semibold px-4 py-2 border-0"
              style={{
                borderRadius: "30px",
                background:
                  "linear-gradient(90deg, #fff3cd, #ffe082, #ffd54f)",
                color: "#000",
                letterSpacing: "0.5px",
                fontSize: "0.9rem",
              }}
            >
              Book Now
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
