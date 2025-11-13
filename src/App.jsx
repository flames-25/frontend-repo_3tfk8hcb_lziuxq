import { useEffect, useMemo, useState } from 'react'
import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  MapPin,
  Users,
  Target,
  Rocket
} from 'lucide-react'

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

function Navbar({ brand, colors }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl" style={{ background: colors.primary }} />
            <span className="font-semibold text-lg">{brand || 'Our Club'}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#vision" className="hover:opacity-80">Vision</a>
            <a href="#events" className="hover:opacity-80">Events</a>
            <a href="#team" className="hover:opacity-80">Team</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Menu">
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black" />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-sm">
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#vision" onClick={() => setOpen(false)}>Vision</a>
            <a href="#events" onClick={() => setOpen(false)}>Events</a>
            <a href="#team" onClick={() => setOpen(false)}>Team</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </div>
        )}
      </div>
    </header>
  )
}

function Hero({ info, colors }) {
  const gradient = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20" style={{ background: gradient }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-black/5">
              <Rocket className="w-4 h-4" />
              {info?.tagline || 'Create. Collaborate. Celebrate.'}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {info?.name || 'College Club'}
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {info?.about || 'We are a student-led community organizing talks, workshops and events to empower peers and build great things together.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#events" className="px-5 py-2.5 rounded-lg text-white shadow" style={{ background: colors.primary }}>Explore Events</a>
              <a href="#team" className="px-5 py-2.5 rounded-lg border border-black/10">Meet the Team</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 border border-black/5 overflow-hidden">
              <div className="absolute inset-0 opacity-60" style={{ background: gradient }} />
              <div className="absolute inset-6 rounded-xl bg-white/80 backdrop-blur border border-white/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  )
}

function EventCard({ e }) {
  return (
    <div className="group rounded-xl border border-black/5 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {e.cover_image ? (
        <img src={e.cover_image} alt={e.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-gray-50 to-gray-100" />
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
        {e.description && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{e.description}</p>}
        {e.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {e.tags.slice(0, 4).map((t, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-black/5">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function TeamCard({ m }) {
  return (
    <div className="text-center p-6 rounded-xl bg-white border border-black/5 shadow-sm">
      <div className="mx-auto h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {m.avatar && <img src={m.avatar} className="h-full w-full object-cover" alt={m.name} />}
      </div>
      <h4 className="mt-3 font-semibold text-gray-900">{m.name}</h4>
      <p className="text-sm text-gray-500">{m.role}</p>
      {m.bio && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{m.bio}</p>}
    </div>
  )
}

function SocialLinks({ socials, colors }) {
  const icons = {
    instagram: Instagram,
    twitter: Twitter,
    x: Twitter,
    linkedin: Linkedin,
    email: Mail
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(socials || []).map((s, i) => {
        const key = (s.platform || '').toLowerCase()
        const Icon = icons[key] || LinkIcon
        return (
          <a key={i} href={s.url} target="_blank" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white"
            style={{ background: colors.primary }} rel="noreferrer">
            <Icon className="w-4 h-4" />
            <span>{s.platform}</span>
          </a>
        )
      })}
    </div>
  )
}

function LinkIcon(props){
  return <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}><path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm7-3h3a5 5 0 1 1 0 10h-3v-2h3a3 3 0 1 0 0-6h-3V9Z"/></svg>
}

export default function App() {
  const { data: clubData } = useFetch('/api/club')
  const { data: eventsData } = useFetch('/api/events')
  const { data: teamData } = useFetch('/api/team')
  const { data: socialsData } = useFetch('/api/socials')

  const info = (clubData && clubData[0]) || {
    name: 'Your Club Name',
    tagline: 'Innovate • Inspire • Impact',
    about: 'A student-run community hosting meetups, hackathons and hands-on workshops.',
    vision: 'To cultivate a culture of curiosity and collaboration.',
    mission: 'Enable every student to learn by building and sharing.',
    primary_color: '#3b82f6',
    secondary_color: '#8b5cf6'
  }
  const colors = { primary: info.primary_color || '#3b82f6', secondary: info.secondary_color || '#8b5cf6' }

  const events = eventsData && Array.isArray(eventsData) && eventsData.length ? eventsData : [
    { title: 'Welcome Orientation', date: '2024-08-10', location: 'Auditorium', description: 'Kickoff with club intro and games', tags: ['Orientation', 'Fun'] },
    { title: 'Web Dev Workshop', date: '2024-09-05', location: 'Lab 3', description: 'Modern React + Tailwind session', tags: ['Workshop', 'React'] },
    { title: 'Hack Night', date: '2024-10-21', location: 'Innovation Hub', description: 'Build something cool in 4 hours!', tags: ['Hackathon'] }
  ]

  const team = teamData && Array.isArray(teamData) && teamData.length ? teamData : [
    { name: 'Alex Johnson', role: 'President' },
    { name: 'Priya Singh', role: 'Vice President' },
    { name: 'Rahul Mehta', role: 'Tech Lead' },
    { name: 'Sara Lee', role: 'Design Lead' }
  ]

  const socials = socialsData && Array.isArray(socialsData) && socialsData.length ? socialsData : [
    { platform: 'Instagram', url: 'https://instagram.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-800">
      <Navbar brand={info.name} colors={colors} />
      <Hero info={info} colors={colors} />

      <Section id="about" title="About Us" subtitle="Who we are and what we do">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <Users className="w-6 h-6 text-gray-600" />
            <h3 className="mt-3 font-semibold">Community First</h3>
            <p className="mt-1 text-sm text-gray-600">Peer-led learning with inclusive, beginner-friendly spaces.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <Target className="w-6 h-6 text-gray-600" />
            <h3 className="mt-3 font-semibold">Hands-on</h3>
            <p className="mt-1 text-sm text-gray-600">Workshops, live demos, and projects that ship.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <Rocket className="w-6 h-6 text-gray-600" />
            <h3 className="mt-3 font-semibold">Industry-ready</h3>
            <p className="mt-1 text-sm text-gray-600">Talks from alumni and pros to stay ahead of the curve.</p>
          </div>
        </div>
      </Section>

      <Section id="vision" title="Vision & Mission" subtitle="What drives us">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Vision</h3>
            <p className="mt-2 text-gray-600">{info.vision}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Mission</h3>
            <p className="mt-2 text-gray-600">{info.mission}</p>
          </div>
        </div>
      </Section>

      <Section id="events" title="Events" subtitle="Highlights from our journey">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e, idx) => <EventCard key={idx} e={e} />)}
        </div>
      </Section>

      <Section id="team" title="Meet the Team" subtitle="The people who make it happen">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((m, idx) => <TeamCard key={idx} m={m} />)}
        </div>
      </Section>

      <Section id="contact" title="Connect with us" subtitle="Follow our socials and say hello">
        <SocialLinks socials={socials} colors={colors} />
      </Section>

      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {info.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
