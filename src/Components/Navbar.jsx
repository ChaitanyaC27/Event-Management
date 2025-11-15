import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  const closeNavbar = () => {
    const nav = document.getElementById("navbarNav");
    if (nav) {
      const bsCollapse = new window.bootstrap.Collapse(nav, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style={{ background: "linear-gradient(135deg, #1e1e2f, #282846, #1b1b2a)", padding: "12px 0" }}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold align-items-center" style={{ fontSize: "1.5rem" }}>
          <i className="bi bi-calendar-heart-fill text-danger me-2 fs-4"></i>
          <span className="text-warning">Event</span> Pro
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
            {[
              { path: "/", name: "Home" },
              { path: "/about", name: "About" },
              { path: "/services", name: "Services" },
              { path: "/booknow", name: "Book Now" },
              { path: "/contact", name: "Contact" },
              { path: "/mybooking", name: "My Booking"},
            ].map(({ path, name }) => (
              <li className="nav-item" key={path}>
                <NavLink to={path} end={path === "/"} className={({ isActive }) => `nav-link fw-semibold ${isActive ? "text-warning" : "text-light"}`} style={{ transition: "0.3s ease" }} onClick={closeNavbar}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2">
            {user ? (
              <>
                <span className="btn btn-outline-light fw-semibold px-4 py-2 rounded-pill">
                 Hi, {user.name}
                </span>
                <button onClick={logout} className="btn btn-danger fw-semibold px-4 py-2 rounded-pill">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeNavbar} className="btn btn-outline-light fw-semibold px-4 py-2 rounded-pill">
                  Login
                </Link>
                <Link to="/signup" onClick={closeNavbar} className="btn fw-semibold px-4 py-2 rounded-pill" style={{ background: "linear-gradient(135deg, #ffcc00, #ffb300, #ffa000)", color: "#000" }}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
