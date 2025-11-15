import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Wedding from "../assets/weddingg.webp";
import Engagement from "../assets/Engagmentt.webp";
import Birthday from "../assets/birthday.webp";
import GetTogether from "../assets/getTogether.webp";
import ProfessionalParty from "../assets/Professional.png";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Dream Weddings",
      img: Wedding,
      desc: "From elegant decor to seamless coordination, we make your dream wedding come true with perfection and love.",
    },
    {
      title: "Engagement Events",
      img: Engagement,
      desc: "Celebrate the start of forever with style and elegance, crafted with personalized touches for your special day.",
    },
    {
      title: "Get-Togethers",
      img: GetTogether,
      desc: "Reunite with family and friends in a warm, joyful atmosphere. Where every moment becomes a memory.",
    },
    {
      title: "Birthday Celebrations",
      img: Birthday,
      desc: "Fun themes, lively decor, and happy vibes ! We create unforgettable birthday memories for all ages.",
    },
    {
      title: "Corporate & Professional Parties",
      img: ProfessionalParty,
      desc: "From team celebrations to business galas, we plan elegant, impactful, and hassle-free corporate events.",
    },
  ];

  return (
    <section
      className="py-5 text-center position-relative"
      style={{
        background: "linear-gradient(135deg, #fffbe6, #ffe6f0, #fff9e6)",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* ✨ Floating background orbs like Contact Form */}
      <motion.div
        className="position-absolute rounded-circle bg-warning"
        style={{
          width: "220px",
          height: "220px",
          top: "120px",
          right: "-80px",
          opacity: 0.25,
          filter: "blur(90px)",
          zIndex: 0,
        }}
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="position-absolute rounded-circle bg-warning"
        style={{
          width: "200px",
          height: "200px",
          bottom: "100px",
          left: "-70px",
          opacity: 0.2,
          filter: "blur(80px)",
          zIndex: 0,
        }}
        animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      {/* 🌟 Heading */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <motion.h2
          className="fw-bold mb-3 text-warning"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Premium Event Services
        </motion.h2>

        <motion.p
          className="text-dark mb-5 mx-auto"
          style={{ maxWidth: "650px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          We turn every celebration into a masterpiece from weddings to
          corporate events, our expert team ensures every moment feels magical.
        </motion.p>

        {/* 🌸 Service Cards with full card hover zoom */}
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 15px 40px rgba(255, 193, 7, 0.35)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="card h-100 border-0 shadow-lg overflow-hidden"
                style={{
                  borderRadius: "22px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,249,230,0.9))",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* 🖼️ Image */}
                <div
                  style={{
                    height: "240px",
                    overflow: "hidden",
                    borderTopLeftRadius: "22px",
                    borderTopRightRadius: "22px",
                  }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    className="card-img-top"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* 📝 Content */}
                <div className="card-body p-4">
                  <h5 className="fw-bold text-warning mb-2">{service.title}</h5>
                  <p
                    className="text-muted mb-4"
                    style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                  >
                    {service.desc}
                  </p>

                  {/* 💛 Book Now Button */}
                  <motion.button
                    onClick={() => navigate("/booknow")}
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
