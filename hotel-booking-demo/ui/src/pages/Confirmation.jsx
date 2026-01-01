import React, { useEffect, useState } from 'react'

export default function Confirmation(){
  const [resId, setResId] = useState('')
  const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  useEffect(()=>{
    const params = new URLSearchParams(window.location.hash.split('?')[1])
    const id = params.get('id')
    if (!id) { setResId('N/A'); return }
    if (!API) { setResId('API not configured'); return }
    fetch(API + '/bookings/' + id)
      .then(r=>r.json())
      .then(b=> setResId(b && b.id ? b.id : 'Not found'))
      .catch(()=> setResId('Error'))
  },[API])

  return (
    <main>
      <h2 data-testid="success-message">Booking Confirmed</h2>
      <div>Reservation ID: <span data-testid="reservation-id">{resId}</span></div>
    </main>
  )
}
