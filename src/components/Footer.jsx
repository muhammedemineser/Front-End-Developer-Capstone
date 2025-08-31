import React from 'react'
import icon from "../assets/icon_vertical.png"

export const Footer = () => {
  return (
    <>
    <h4 id="contact">Contact Us</h4>
    <footer className="footer">
      <div className="footer-left">
        <img src={icon} alt="icon" className="footer-icon" />
      </div>
      <div className="footer-right">
        <p className="address">1234 Delicious St, Chicago, IL 60601</p>
        <p className="phone">(123) 456-7890</p>
      <p><small>&copy; 2025 Little Lemon. All rights reserved.</small></p>
      </div>
    </footer>
    </>
  )
}
