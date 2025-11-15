import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const EditBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    eventType: "",
    decoration: "",
    catering: "",
    thaliType: "",
    peopleCount: "",
    music: "",
    photographer: "",
    location: "",
    date: "",
    time: "",
    specialRequest: "",
  });

  const [budgetRange, setBudgetRange] = useState("");
  const [loading, setLoading] = useState(false);

  const yesNoOptions = ["Yes", "No"];
  const musicOptions = ["DJ", "Live Band", "Soft Music", "No Music"];
  const cateringOptions = ["Veg", "Non-Veg", "Both", "No"];
  const decorationOptions = ["Simple", "Moderate", "Advanced", "No"];
  const eventOptions = ["Wedding", "Engagement", "Birthday", "Get Together", "Professional Party"];
  const thaliOptions = ["Basic", "Premium", "Royal"];

  // Prefill booking data
  useEffect(() => {
    if (booking) {
      setFormData({ ...booking });
      calculateBudget(booking); // calculate budget on load
    } else {
      Swal.fire("❌ Error", "No booking data found", "error");
      navigate("/bookings");
    }
  }, [booking, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (name === "catering" && value === "No") {
      updated.thaliType = "";
      updated.peopleCount = "";
    }

    setFormData(updated);
    calculateBudget(updated);
  };

  const calculateBudget = (data) => {
    let base = 0;
    const pricing = {
      Wedding: { Simple: 60000, Moderate: 100000, Advanced: 200000 },
      Engagement: { Simple: 30000, Moderate: 50000, Advanced: 100000 },
      Birthday: { Simple: 15000, Moderate: 30000, Advanced: 50000 },
      "Get Together": { Simple: 12000, Moderate: 20000, Advanced: 30000 },
      "Professional Party": { Simple: 30000, Moderate: 50000, Advanced: 100000 },
    };

    if (data.eventType && data.decoration && data.decoration !== "No") {
      base += pricing[data.eventType][data.decoration] || 0;
    }

    if (data.catering && data.catering !== "No" && data.thaliType && data.peopleCount) {
      const cateringPricing = { Veg: 10000, "Non-Veg": 15000, Both: 25000 };
      const thaliPricing = { Basic: 10000, Premium: 15000, Royal: 25000 };
      base += cateringPricing[data.catering] || 0;
      base += thaliPricing[data.thaliType] || 0;
      base += parseInt(data.peopleCount || 0, 10) * 300;
    }

    if (data.photographer === "Yes") base += 8000;

    if (data.music && data.music !== "No Music") {
      const musicPricing = { DJ: 20000, "Live Band": 50000, "Soft Music": 20000 };
      base += musicPricing[data.music] || 0;
    }

    const selectedServices = [
      data.decoration && data.decoration !== "No" ? "decoration" : null,
      data.catering && data.catering !== "No" ? "catering" : null,
      data.music && data.music !== "No Music" ? "music" : null,
      data.photographer === "Yes" ? "photographer" : null,
    ].filter(Boolean);

    if (selectedServices.length >= 2 && (selectedServices.includes("decoration") || selectedServices.includes("catering"))) {
      const min = Math.round(base * 0.9);
      const max = Math.round(base * 1.1);
      setBudgetRange(`₹${min.toLocaleString()} - ₹${max.toLocaleString()}`);
    } else {
      setBudgetRange(`₹${base.toLocaleString()}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.date || !formData.time || !formData.location.trim()) {
      Swal.fire({ title: "⚠️ Missing Details", text: "Please select Date, Time, and Location.", icon: "warning" });
      setLoading(false);
      return;
    }

    if ((!formData.decoration || formData.decoration === "No") &&
        (!formData.catering || formData.catering === "No")) {
      Swal.fire({
  title: "⚠️ Cannot Submit",
  html: `Please select at least <strong>2 services</strong>, 
         and one of them must be <strong>Decoration</strong> or <strong>Catering</strong>
         for submitting.`,
  icon: "warning",
  confirmButtonText: "OK"
});

setLoading(false);
return;

    }

    try {
      await axios.put(`http://localhost:3000/bookings/${booking.id}`, { ...formData, budgetRange });
      Swal.fire({ title: "✅ Booking Updated!", html: `<p>Estimated Budget: <strong>${budgetRange}</strong></p>`, icon: "success", timer: 4000 });
      navigate("/bookings");
    } catch (err) {
      Swal.fire("❌ Update Failed", "Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5" style={{ background: "linear-gradient(135deg, #fffbe6, #ffe6f0, #fff9e6)" }}>
      <div className="container">
        <motion.div className="text-center mb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="fw-bold text-warning display-6">Edit Booking</h2>
          <p className="text-dark">Update your booking details below to adjust your event plan.</p>
        </motion.div>

        <div className="row justify-content-center">
          <motion.div className="col-lg-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="card border-0 shadow-lg" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.9)" }}>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Full Name, Email, Contact */}
                    {["fullName", "email", "contactNumber"].map((field) => (
                      <div key={field} className="col-md-6">
                        <label className="form-label fw-semibold">
                          {field === "fullName" ? "Full Name" : field === "email" ? "Email" : "Contact Number"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          className="form-control"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          style={{ backgroundColor: formData[field] ? "#fff3cd" : "#fff" }}
                        />
                      </div>
                    ))}

                    {/* Event Type */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Event Type</label>
                      <select
                        className="form-select"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        style={{ backgroundColor: formData.eventType ? "#fff3cd" : "#fff" }}
                      >
                        <option value="">Select</option>
                        {eventOptions.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>

                    {/* Conditional fields */}
                    <AnimatePresence>
                      {formData.eventType && (
                        <motion.div className="col-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="row g-3 mt-2">
                            {/* Decoration */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Decoration</label>
                              <select
                                className="form-select"
                                name="decoration"
                                value={formData.decoration}
                                onChange={handleChange}
                                style={{ backgroundColor: formData.decoration ? "#fff3cd" : "#fff" }}
                              >
                                <option value="">Select</option>
                                {decorationOptions.map(opt => <option key={opt}>{opt}</option>)}
                              </select>
                            </div>

                            {/* Catering */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Catering</label>
                              <select
                                className="form-select"
                                name="catering"
                                value={formData.catering}
                                onChange={handleChange}
                                style={{ backgroundColor: formData.catering ? "#fff3cd" : "#fff" }}
                              >
                                <option value="">Select</option>
                                {cateringOptions.map(opt => <option key={opt}>{opt}</option>)}
                              </select>
                            </div>

                            {/* Thali + Guests */}
                            {formData.catering && formData.catering !== "No" && (
                              <>
                                <div className="col-md-6">
                                  <label className="form-label fw-semibold">Thali Type</label>
                                  <select
                                    className="form-select"
                                    name="thaliType"
                                    value={formData.thaliType}
                                    onChange={handleChange}
                                    style={{ backgroundColor: formData.thaliType ? "#fff3cd" : "#fff" }}
                                  >
                                    <option value="">Select</option>
                                    {thaliOptions.map(opt => <option key={opt}>{opt}</option>)}
                                  </select>
                                </div>

                                <div className="col-md-6">
                                  <label className="form-label fw-semibold">Number of Guests</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="peopleCount"
                                    value={formData.peopleCount}
                                    onChange={handleChange}
                                    style={{ backgroundColor: formData.peopleCount ? "#fff3cd" : "#fff" }}
                                  />
                                </div>
                              </>
                            )}

                            {/* Music + Photographer */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Music / DJ</label>
                              <select className="form-select" name="music" value={formData.music} onChange={handleChange} style={{ backgroundColor: formData.music ? "#fff3cd" : "#fff" }}>
                                <option value="">Select</option>
                                {musicOptions.map(opt => <option key={opt}>{opt}</option>)}
                              </select>
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Photographer Required</label>
                              <select className="form-select" name="photographer" value={formData.photographer} onChange={handleChange} style={{ backgroundColor: formData.photographer ? "#fff3cd" : "#fff" }}>
                                <option value="">Select</option>
                                {yesNoOptions.map(opt => <option key={opt}>{opt}</option>)}
                              </select>
                            </div>

                            {/* Date + Time + Location */}
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Event Date</label>
                              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} style={{ backgroundColor: formData.date ? "#fff3cd" : "#fff" }} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label fw-semibold">Event Time</label>
                              <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} style={{ backgroundColor: formData.time ? "#fff3cd" : "#fff" }} />
                            </div>
                            <div className="col-12">
                              <label className="form-label fw-semibold">Location / Venue</label>
                              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} style={{ backgroundColor: formData.location ? "#fff3cd" : "#fff" }} />
                            </div>

                            {/* Special Request */}
                            <div className="col-12">
                              <label className="form-label fw-semibold">Special Requests / Notes</label>
                              <textarea className="form-control" rows="3" name="specialRequest" value={formData.specialRequest} onChange={handleChange} style={{ backgroundColor: formData.specialRequest ? "#fff3cd" : "#fff" }}></textarea>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Budget */}
                  {budgetRange && <div className="alert alert-info mt-4 text-center fw-bold">Estimated Budget: {budgetRange}</div>}

                  <div className="d-grid mt-3">
                    <button type="submit" className="btn btn-warning fw-bold py-2" disabled={loading}>
                      {loading ? "Updating..." : "Update Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditBookingForm;
