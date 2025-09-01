import React from 'react'
import restaurantImage from "../assets/book_table.jpg"
import { useState } from 'react'
import CalendarForm from "./Date"


export const BookTable = () => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBookTableClick = () => {
    setIsBooking(true);
  };

  return (
    <section style={{ backgroundImage: `url(${restaurantImage})`, backgroundSize: 'cover', backgroundPosition: 'center' , width:"90%", height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"auto", textAlign:"center", color:"white", padding:"20px", boxSizing:"border-box", borderRadius: "15%" }} className='bookTable'>
        <span className="bg-gray-900 p-3"><h2 >Book a Table</h2>
        <p>Experience the best of Mediterranean cuisine.</p>
        </span>
        {!isBooking && <button onClick={handleBookTableClick} className='bookBtn'>Book Now</button>}
        { isBooking && <CalendarForm />}
    </section>
  )
}
