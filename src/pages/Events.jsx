import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { Shell } from '../components/Shell'

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
    return () => { isMounted = false }
  }, [url])

  return { data, loading, error }
}

function EventCard({ e, colors }){
  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-black/5 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {e.cover_image ? (
        <img src={e.cover_image} alt={e.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44" style={{ background: `linear-gradient(135deg, ${colors.primary}22, ${colors.gold}22)` }} />
      )}
      <div className="p-4">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{e.date}</span>
        </div>
        <h3 className="mt-1.5 font-semibold text-gray-900">{e.title}</h3>
        {e.location && (
          <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{e.location}</span>
          </div>
        )}
        {e.description && <p className="mt-2 text-sm text-gray-600">{e.description}</p>}
      </div>
    </motion.div>
  )
}

export default function EventsPage({ info, colors }){
  const { data: eventsData } = useFetch('/api/events')
  const events = eventsData && Array.isArray(eventsData) && eventsData.length ? eventsData : [
    { title: 'Welcome Orientation', date: '2024-08-10', location: 'Auditorium', description: 'Kickoff with club intro and games' },
    { title: 'Web Dev Workshop', date: '2024-09-05', location: 'Lab 3', description: 'Modern React + Tailwind session' },
    { title: 'Hack Night', date: '2024-10-21', location: 'Innovation Hub', description: 'Build something cool in 4 hours!' }
  ]

  return (
    <Shell brandName={info.name} colors={colors}>
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.dark }}>Events</h1>
            <p className="mt-2 text-gray-600">All our past and upcoming events.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e, idx) => <EventCard key={idx} e={e} colors={colors} />)}
          </div>
        </div>
      </section>
    </Shell>
  )
}
