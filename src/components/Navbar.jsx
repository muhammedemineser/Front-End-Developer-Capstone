import React from 'react'
import icon from "../assets/icon.png"

export const Navbar = () => {
  return (
    <header id="home">
      <img src={icon} alt="icon" id="logo" />
      <nav className='navi'>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        </nav>  
    </header>
  )
}
