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
    <main>
      <h2>Booking Form</h2>
      <div id="hotelInfo">{selection && selection.hotelName ? `Hotel: ${selection.hotelName} — ${selection.checkin} to ${selection.checkout}` : ''}</div>
      <div className="form-row"><label>First name</label><input data-testid="firstname-input" value={firstname} onChange={e=>setFirstname(e.target.value)} /></div>
      <div className="form-row"><label>Last name</label><input data-testid="lastname-input" value={lastname} onChange={e=>setLastname(e.target.value)} /></div>
      <div className="form-row"><label>Email</label><input data-testid="email-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div className="form-row"><div data-testid="form-error" className="error" aria-live="polite">{error}</div></div>
      <div className="form-row"><button data-testid="confirm-booking-btn" onClick={onConfirm}>Confirm Booking</button></div>
    </main>
  )
}
