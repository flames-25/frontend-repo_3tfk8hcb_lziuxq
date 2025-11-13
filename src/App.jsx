import { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventsPage from './pages/Events'
import TeamPage from './pages/Team'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function useFetch(path) {
  const url = useMemo(() => `${API_BASE}${path}`, [path])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()
        if (isMounted) setData(json)
      } catch (e) {
        if (isMounted) setError(e.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}

export default function App(){
  const { data: clubData } = useFetch('/api/club')
  const { data: socialsData } = useFetch('/api/socials')

  const info = (clubData && clubData[0]) || {
    name: 'AIM The Club',
    tagline: 'Innovate • Inspire • Impact',
    about: 'A student-run community hosting meetups, hackathons and hands-on workshops.',
    vision: 'To cultivate a culture of curiosity and collaboration.',
    mission: 'Enable every student to learn by building and sharing.',
    primary_color: '#2196F3',
    secondary_color: '#0D274D'
  }

  const colors = {
    primary: info.primary_color || '#2196F3',
    dark: '#0D274D',
    gold: '#FFD700',
    white: '#FFFFFF',
    orange: '#FFA500'
  }

  const socials = socialsData && Array.isArray(socialsData) && socialsData.length ? socialsData : [
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' }
  ]

  return (
    <Routes>
      <Route path="/" element={<Home info={info} colors={colors} />} />
      <Route path="/about" element={<AboutPage info={info} colors={colors} />} />
      <Route path="/events" element={<EventsPage info={info} colors={colors} />} />
      <Route path="/team" element={<TeamPage info={info} colors={colors} />} />
      <Route path="/contact" element={<ContactPage info={info} colors={colors} socials={socials} />} />
    </Routes>
  )
}
