import React, { useState } from 'react'

export default function Booking(){
  const selection = JSON.parse(localStorage.getItem('hotel_selection') || '{}')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  function onConfirm(){
    if (!firstname || !lastname || !email){ setError('Please fill all fields.'); return }
    if (!API){ setError('API base URL not configured.'); return }
    setError('')
    const payload = { firstname, lastname, email, hotelId: selection.hotelId, checkin: selection.checkin, checkout: selection.checkout }
    fetch(API + '/bookings', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      .then(r=>r.json())
      .then(data=> {
        window.location.hash = '#/confirmation?id=' + data.id
      })
      .catch(()=> setError('Failed to create booking.'))
  }

  return (
    <main className="booking-page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✍️</div>
        <h2>Booking Form</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Complete your reservation details
        </p>
      </div>
      {selection && selection.hotelName && (
        <div id="hotelInfo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🏨</span>
            <strong>{selection.hotelName}</strong>
          </div>
          <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
            📅 {selection.checkin} → {selection.checkout}
          </div>
        </div>
      )}
      <div className="form-row">
        <label>👤 First name</label>
        <input data-testid="firstname-input" value={firstname} onChange={e=>setFirstname(e.target.value)} placeholder="Enter your first name" />
      </div>
      <div className="form-row">
        <label>👤 Last name</label>
        <input data-testid="lastname-input" value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Enter your last name" />
      </div>
      <div className="form-row">
        <label>📧 Email</label>
        <input data-testid="email-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.email@example.com" />
      </div>
      <div className="form-row">
        <div data-testid="form-error" className="error" aria-live="polite">{error}</div>
      </div>
      <div className="form-row">
        <button data-testid="confirm-booking-btn" onClick={onConfirm}>✅ Confirm Booking</button>
      </div>
    </main>
  )
}
