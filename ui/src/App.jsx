import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import Results from './pages/Results'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'

export default function App(){
  const [route, setRoute] = useState(window.location.hash || '#/')
  useEffect(()=>{
    const onHash = ()=> setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  if (route.startsWith('#/search')) return <Search />
  if (route.startsWith('#/results')) return <Results />
  if (route.startsWith('#/booking')) return <Booking />
  if (route.startsWith('#/confirmation')) return <Confirmation />
  return <Home />
}
