import React from 'react'

export default function Home(){
  return (
    <main className="home-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏨</div>
        <h1>Hotel Booking Demo</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Find and book your perfect hotel stay
        </p>
      </div>
      <button data-testid="start-booking-btn" onClick={()=> window.location.hash = '#/search'}>
        Start Booking →
      </button>
    </main>
  )
}
