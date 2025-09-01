import React from 'react'
import restaurantImage from "../assets/restaurant.jpg"
import { BookTable } from './BookingForm'

export const Main = () => {
  return (
    <main>
        <section>
          <div className="hero">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          </div>
        </section>
        <h4 id="menu">Our Menus</h4>
        <section className="food_wrapper">
            <article className="food_col" id="food_1"><h1>Lorem, ipsum dolor.</h1>Lorem, ipsum dolor sit amet consectetur adipisicing.</article>
            <article className="food_col" id="food_2"><h1>Lorem, ipsum dolor.</h1>Lorem, ipsum dolor sit amet consectetur adipisicing.</article>
            <article className="food_col" id="food_3"><h1>Lorem, ipsum dolor.</h1>Lorem, ipsum dolor sit amet consectetur adipisicing.</article>
        </section>
        <BookTable />
        <h4 id="about">About Us</h4>
        <section className="hero" style={{backgroundImage: `url(${restaurantImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
              <h1>Little Lemon</h1>
              <h2>Chicago</h2>
              <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Our chefs draw inspiration from Italian, Greek, and Turkish culture and have a passion for creating dishes made with fresh ingredients.</p>
              <p>We are located in the heart of Chicago, just a few minutes from the city center. We hope to see you soon!</p>
        </section>
    </main>
  )
}
