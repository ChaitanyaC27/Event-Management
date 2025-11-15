import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white position-relative"
      style={{
        background: "linear-gradient(135deg, #1e1e2f, #282846, #1b1b2a)",
        padding: "60px 0 30px",
        overflow: "hidden",
      }}
    >
      {/* Animated Glow Background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at 20% 40%, rgba(255, 215, 0, 0.15), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255, 105, 180, 0.1), transparent 70%)",
          zIndex: 0,
        }}
      ></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row text-center text-md-start align-items-start">
          {/* Left: Brand Info */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="fw-bold text-warning d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <i className="bi bi-calendar-heart-fill text-danger fs-4"></i>
              Event <span className="fw-bold text-light">Pro</span>
            </h4>
            <p className="text-light mt-2">
              Crafting{" "}
              <span className="text-warning fw-semibold">
                unforgettable experiences.
              </span>{" "}
               Weddings, Birthdays, and Grand celebrations that shine forever.
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <h5 className="fw-bold text-warning mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 social-icon"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 social-icon"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 social-icon"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
            <small className="text-secondary">
              Follow us for the latest event updates!
            </small>
          </div>

          {/* Right: Contact Info */}
          <div className="col-md-4 mb-4 mb-md-0 text-md-end text-center">
            <h5 className="fw-bold text-warning mb-3">Get in Touch</h5>
            <p className="mb-2">
              <i className="bi bi-geo-alt-fill text-danger me-2"></i>Pune, Maharashtra
            </p>
            <p className="mb-2">
              <i className="bi bi-envelope-fill text-info me-2"></i>
              info@eventpro.com
            </p>
            <p className="mb-0">
              <i className="bi bi-telephone-fill text-success me-2"></i>
              +91 98765 43210
            </p>
          </div>
        </div>

        <hr className="border-secondary mt-5" />

        {/* Copyright */}
        <div className="text-center mt-3">
          <small className="text-light">
            © {new Date().getFullYear()}{" "}
            <span className="text-warning fw-bold">Event </span><span className="fw-bold">Pro</span>
          </small>
        </div>
      </div>

    
    </footer>
  );
};

export default Footer;
