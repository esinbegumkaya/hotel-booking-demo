import React, { useState } from 'react'

export default function Search(){
  const [city, setCity] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [error, setError] = useState('')

  function validDates(ci, co){
    if (!ci || !co) return false
    return new Date(ci) < new Date(co)
  }

  function onSearch(){
    if (!validDates(checkin, checkout)){
      setError('Check-out date must be after check-in date.')
      return
    }
    setError('')
    localStorage.setItem('hotel_search', JSON.stringify({ city, checkin, checkout }))
    window.location.hash = '#/results'
  }

  return (
    <main>
      <h2>Search Hotels</h2>
      <div className="form-row">
        <label>City</label>
        <input data-testid="city-input" value={city} onChange={e=>setCity(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Check-in</label>
        <input data-testid="checkin-input" type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Check-out</label>
        <input data-testid="checkout-input" type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} />
      </div>
      <div className="form-row">
        <div data-testid="date-error" className="error" aria-live="polite">{error}</div>
      </div>
      <div className="form-row">
        <button data-testid="search-btn" onClick={onSearch}>Search</button>
      </div>
    </main>
  )
}
