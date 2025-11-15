import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import decoration from "../assets/decoration.webp";
import videoplayback from "../assets/videoplayback.mp4";
import Services from "./Services";
import AboutUs from "./About";

const Homepage = () => {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <header
        className="position-relative text-center text-white vh-100 overflow-hidden d-flex align-items-center justify-content-center"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            objectFit: "cover",
            filter: "contrast(1.15) brightness(0.9) saturate(1.3)",
            zIndex: 0,
          }}
        >
          <source src={videoplayback} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
            zIndex: 1,
          }}
        ></div>

        {/* HERO CONTENT */}
        <div
          className="position-relative text-center px-3"
          style={{ zIndex: 2, maxWidth: "900px" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="display-2 fw-bold text-uppercase"
            style={{
              letterSpacing: "2px",
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            Event Pro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lead fs-4 mt-3"
            style={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            Crafting unforgettable experiences from weddings and parties to
            corporate events, we turn your dreams into seamless celebrations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link
              to="/booknow"
              className="btn btn-warning btn-lg fw-bold shadow-lg mt-4 glow-btn"
              style={{
                borderRadius: "50px",
                padding: "10px 30px",
                boxShadow: "0 0 15px rgba(255,193,7,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.boxShadow = "0 0 25px rgba(255,193,7,0.8)")
              }
              onMouseOut={(e) =>
                (e.target.style.boxShadow = "0 0 15px rgba(255,193,7,0.4)")
              }
            >
              <i className="bi bi-lightning-charge-fill me-2"></i>
              Book Your Event Now
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ===== ABOUT SECTION ===== */}
      <AboutUs />

      {/* ===== SERVICES SECTION ===== */}
      <Services />

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section
  className="py-5 text-white position-relative parallax-section"
  style={{
    // Pass the image URL as a CSS variable
    "--bg-image": `url(${decoration})`,
  }}
>
  <div className="bg-dark bg-opacity-75 py-5">
    <div className="container text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="fw-bold mb-4 text-warning"
      >
        Why Choose Event Pro?
      </motion.h2>
      <p className="lead mb-5 w-75 mx-auto text-light">
        Creativity, precision, and passion in every celebration.
      </p>

      <div className="row justify-content-center">
        {[
          { icon: "bi bi-star-fill", text: "Top-Rated Experts" },
          { icon: "bi bi-calendar-heart-fill", text: "Custom Theme Planning" },
          { icon: "bi bi-lightbulb-fill", text: "Creative Decor Ideas" },
          { icon: "bi bi-people-fill", text: "Friendly Team" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="col-md-3 mb-4"
          >
            <div
              className="p-4 rounded-4 bg-light text-dark shadow-lg hover-bounce"
              style={{
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <i className={`${item.icon} fs-1 text-warning mb-3`}></i>
              <h5 className="fw-semibold">{item.text}</h5>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        to="/contact"
        className="btn btn-warning btn-lg mt-4 fw-bold"
        style={{
          borderRadius: "40px",
          padding: "12px 35px",
          boxShadow: "0 0 20px rgba(255,193,7,0.4)",
        }}
      >
        Contact Us Today
      </Link>
    </div>
  </div>
</section>

      {/* ===== CTA SECTION ===== */}
    <section
  className="py-5 text-center position-relative overflow-hidden"
  style={{
    background: "linear-gradient(135deg, #fff8e1, #fff3cd)",
  }}
>
  {/* Floating decorative glows */}
  <motion.div
    className="position-absolute rounded-circle"
    style={{
      width: "400px",
      height: "400px",
      top: "-150px",
      left: "-100px",
      background: "radial-gradient(circle, rgba(255,193,7,0.3), transparent 70%)",
      filter: "blur(80px)",
      zIndex: 0,
    }}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  />
  <motion.div
    className="position-absolute rounded-circle"
    style={{
      width: "450px",
      height: "450px",
      bottom: "-150px",
      right: "-100px",
      background: "radial-gradient(circle, rgba(255,105,180,0.25), transparent 70%)",
      filter: "blur(80px)",
      zIndex: 0,
    }}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
  />

  {/* Glass-effect main container */}
  <div
    className="container position-relative py-5 px-4 shadow-lg"
    style={{
      zIndex: 2,
      background: "rgba(255, 255, 255, 0.75)",
      borderRadius: "25px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,193,7,0.3)",
      maxWidth: "850px",
    }}
  >
    <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="fw-bold mb-4 text-warning"
            >
              Let’s Plan Your Dream Event
            </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="lead mb-4"
      style={{
        color: "#000000ff",
        maxWidth: "650px",
        margin: "0 auto",
        fontSize: "1.2rem",
      }}
    >
      From grand weddings to intimate celebrations. We’ll turn your vision into
      a perfectly curated experience that lasts forever.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Link
        to="/contact"
        className="btn btn-warning btn-lg fw-bold shadow-lg text-dark"
        style={{
          borderRadius: "50px",
          padding: "14px 45px",
          fontSize: "1.1rem",
          letterSpacing: "0.5px",
          background:
            "linear-gradient(135deg, #ffcc00, #ffd54f, #ffecb3)",
          boxShadow: "0 0 25px rgba(255, 193, 7, 0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.target.style.boxShadow = "0 0 35px rgba(255, 193, 7, 0.7)")
        }
        onMouseOut={(e) =>
          (e.target.style.boxShadow = "0 0 25px rgba(255, 193, 7, 0.4)")
        }
      >
        Contact Us for a Free Consultation
      </Link>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-4"
    >
      <p className="mb-1" style={{ color: "#444", fontSize: "1.1rem" }}>
        <i className="bi bi-telephone-fill text-success me-2"></i>
        Call us directly at <strong>+91 98765 43210</strong>
      </p>
      <p className="mb-0" style={{ color: "#6c757d" }}>
        <i className="bi bi-envelope-fill text-info me-2"></i>
        Email us at <strong>info@eventpro.in</strong>
      </p>
    </motion.div>
  </div>
</section>


    </>
  );
};

export default Homepage;
