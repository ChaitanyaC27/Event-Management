// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Services from './Components/Services';
import Contact from './Components/Contact';
import BookNow from './Components/BookNow';
import AboutUs from './Components/About';
import ScrollToTop from './Components/ScrollToTop';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { UserContext, UserProvider } from './Components/UserContext';
import BookingsTable from './Components/MyBooking';
import EditBookingForm from './Components/EditBooking';

// Import your other components
// import NewBookingForm from './components/NewBookingForm';
// import BookingDashboard from './components/BookingDashboard';
// import BookingDetails from './components/BookingDetails';
// import EditBookingForm from './components/EditBookingForm';

function App() {
  return (
    <>
    <UserProvider>
    <Router>
      <ScrollToTop/>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/contact"  element={<Contact/>}/>
          <Route path='/booknow'  element={<BookNow/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mybooking' element={<BookingsTable/>}/>
          <Route path="/editbooking" element={<EditBookingForm />}/>
          <Route path="*" element={<Homepage/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;