import React from 'react'

export default function Home(){
  return (
    <main>
      <h1>Hotel Booking Demo</h1>
      <button data-testid="start-booking-btn" onClick={()=> window.location.hash = '#/search'}>Start Booking</button>
    </main>
  )
}
