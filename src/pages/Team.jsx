import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

function MemberCard({ m, colors }){
  return (
    <motion.div whileHover={{ y: -4 }} className="text-center p-6 rounded-xl bg-white border border-black/5 shadow-sm">
      <div className="mx-auto h-24 w-24 rounded-full overflow-hidden" style={{ background: `${colors.primary}18` }}>
        {m.avatar && <img src={m.avatar} className="h-full w-full object-cover" alt={m.name} />}
      </div>
      <h4 className="mt-3 font-semibold text-gray-900">{m.name}</h4>
      <p className="text-sm" style={{ color: colors.dark }}>{m.role}</p>
      {m.bio && <p className="mt-2 text-sm text-gray-600">{m.bio}</p>}
    </motion.div>
  )
}

export default function TeamPage({ info, colors }){
  const { data: teamData } = useFetch('/api/team')
  const team = teamData && Array.isArray(teamData) && teamData.length ? teamData : [
    { name: 'Alex Johnson', role: 'President' },
    { name: 'Priya Singh', role: 'Vice President' },
    { name: 'Rahul Mehta', role: 'Tech Lead' },
    { name: 'Sara Lee', role: 'Design Lead' }
  ]

  return (
    <Shell brandName={info.name} colors={colors}>
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.dark }}>Our Team</h1>
            <p className="mt-2 text-gray-600">Meet the people who make it happen.</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((m, idx) => <MemberCard key={idx} m={m} colors={colors} />)}
          </div>
        </div>
      </section>
    </Shell>
  )
}
