import React, { useEffect, useState } from 'react'

export default function Results(){
  const [hotels, setHotels] = useState([])
  const [error, setError] = useState('')
  const search = JSON.parse(localStorage.getItem('hotel_search') || '{}')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

  useEffect(()=>{
    if (!API) { setError('API base URL not configured. Set VITE_API_URL.'); return }
    fetch(API + '/hotels')
      .then(r=>r.json())
      .then(setHotels)
      .catch(()=> setError('Failed to load hotels'))
  },[API])

  function selectHotel(h){
    const bookingSelection = { hotelId: h.id, hotelName: h.name, checkin: search.checkin, checkout: search.checkout, city: search.city }
    localStorage.setItem('hotel_selection', JSON.stringify(bookingSelection))
    window.location.hash = '#/booking'
  }

  if (error) return <main><div className="error">{error}</div></main>
  return (
    <main>
      <h2>Available Hotels</h2>
      <div>
        {hotels.map(h=> (
          <div className="card" key={h.id}>
            <div data-testid="hotel-name">{h.name}</div>
            <button data-testid="select-hotel-btn" onClick={()=>selectHotel(h)}>Select</button>
          </div>
        ))}
      </div>
    </main>
  )
}
