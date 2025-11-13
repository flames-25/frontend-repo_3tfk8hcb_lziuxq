import { useEffect, useMemo, useState, useRef } from 'react'
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
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

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
    <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="relative h-1">
        {/* Scroll progress bar */}
        <ScrollProgressBar color={colors.accent} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl shadow-inner" style={{ background: colors.primary }} />
            <span className="font-semibold text-lg" style={{ color: colors.dark }}>{brand || 'Our Club'}</span>
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

function ScrollProgressBar({ color = '#FFD700' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 })
  return (
    <motion.div className="absolute left-0 top-0 h-1 w-full origin-left" style={{ scaleX, background: color }} />
  )
}

function Hero({ info, colors }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const gradient = `radial-gradient(80% 80% at 10% 10%, ${colors.primary}22 0%, transparent 60%), radial-gradient(70% 70% at 90% 20%, ${colors.gold}22 0%, transparent 60%)`
  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: gradient }} />
      {/* Decorative orbs */}
      <motion.div className="absolute -top-16 -left-16 h-56 w-56 rounded-full blur-2xl opacity-50" style={{ background: colors.primary, y: y1 }} />
      <motion.div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full blur-2xl opacity-40" style={{ background: colors.gold, y: y2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#0D274D0d', color: colors.dark }}>
              <Rocket className="w-4 h-4" />
              {info?.tagline || 'Create. Collaborate. Celebrate.'}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }} className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: colors.dark }}>
              {info?.name || 'College Club'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="mt-4 text-gray-700 leading-relaxed">
              {info?.about || 'We are a student-led community organizing talks, workshops and events to empower peers and build great things together.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }} className="mt-8 flex flex-wrap gap-3">
              <a href="#events" className="px-5 py-2.5 rounded-lg text-white shadow hover:shadow-md transition" style={{ background: colors.primary }}>Explore Events</a>
              <a href="#team" className="px-5 py-2.5 rounded-lg border border-black/10 hover:bg-black/5 transition">Meet the Team</a>
            </motion.div>
          </div>
          <div className="relative">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="aspect-[4/3] rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 border border-black/5 overflow-hidden">
              <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.gold} 100%)` }} />
              <div className="absolute inset-6 rounded-xl bg-white/80 backdrop-blur border border-white/60" />
            </motion.div>
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
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: 'easeOut' }} className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0D274D' }}>{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: 'easeOut' }} className="mt-8">
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function EventCard({ e, colors }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="snap-start group rounded-xl border border-black/5 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow min-w-[280px] sm:min-w-[320px]">
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
        {e.description && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{e.description}</p>}
        {e.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {e.tags.slice(0, 4).map((t, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${colors.primary}15`, color: colors.dark }}>{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

function HorizontalScroller({ items, colors }) {
  return (
    <div className="relative">
      {/* subtle gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-thin" style={{ scrollSnapType: 'x mandatory' }}>
        {items.map((e, idx) => (
          <EventCard key={idx} e={e} colors={colors} />
        ))}
      </div>
    </div>
  )
}

function TeamCard({ m, colors }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="text-center p-6 rounded-xl bg-white border border-black/5 shadow-sm">
      <div className="mx-auto h-20 w-20 rounded-full overflow-hidden" style={{ background: `${colors.primary}18` }}>
        {m.avatar && <img src={m.avatar} className="h-full w-full object-cover" alt={m.name} />}
      </div>
      <h4 className="mt-3 font-semibold text-gray-900">{m.name}</h4>
      <p className="text-sm" style={{ color: colors.dark }}>{m.role}</p>
      {m.bio && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{m.bio}</p>}
    </motion.div>
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
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} key={i} href={s.url} target="_blank" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white shadow" style={{ background: colors.dark }} rel="noreferrer">
            <Icon className="w-4 h-4" />
            <span>{s.platform}</span>
          </motion.a>
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
    name: 'AIM The Club',
    tagline: 'Innovate • Inspire • Impact',
    about: 'A student-run community hosting meetups, hackathons and hands-on workshops.',
    vision: 'To cultivate a culture of curiosity and collaboration.',
    mission: 'Enable every student to learn by building and sharing.',
    primary_color: '#2196F3',
    secondary_color: '#0D274D'
  }

  const brand = {
    primary: info.primary_color || '#2196F3', // Bright/Azure Blue
    dark: '#0D274D', // Navy/Midnight
    gold: '#FFD700', // Golden Yellow (AIM & circuits)
    white: '#FFFFFF', // Inner circle / text
    orange: '#FFA500' // Bullseye dot
  }

  const events = eventsData && Array.isArray(eventsData) && eventsData.length ? eventsData : [
    { title: 'Welcome Orientation', date: '2024-08-10', location: 'Auditorium', description: 'Kickoff with club intro and games', tags: ['Orientation', 'Fun'] },
    { title: 'Web Dev Workshop', date: '2024-09-05', location: 'Lab 3', description: 'Modern React + Tailwind session', tags: ['Workshop', 'React'] },
    { title: 'Hack Night', date: '2024-10-21', location: 'Innovation Hub', description: 'Build something cool in 4 hours!', tags: ['Hackathon'] },
    { title: 'AI for Everyone', date: '2024-11-12', location: 'Main Hall', description: 'Intro to ML and GenAI hands-on', tags: ['AI', 'Talk'] },
    { title: 'Design Sprint', date: '2025-01-16', location: 'Studio', description: 'Rapid prototyping challenge', tags: ['Design'] }
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
      <Navbar brand={info.name} colors={brand} />
      <Hero info={info} colors={brand} />

      <Section id="about" title="About Us" subtitle="Who we are and what we do">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={<Users className="w-6 h-6" />} title="Community First" text="Peer-led learning with inclusive, beginner-friendly spaces." color={brand.primary} />
          <Feature icon={<Target className="w-6 h-6" />} title="Hands-on" text="Workshops, live demos, and projects that ship." color={brand.orange} />
          <Feature icon={<Rocket className="w-6 h-6" />} title="Industry-ready" text="Talks from alumni and pros to stay ahead of the curve." color={brand.gold} />
        </div>
      </Section>

      <Section id="vision" title="Vision & Mission" subtitle="What drives us">
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="font-semibold" style={{ color: brand.dark }}>Vision</h3>
            <p className="mt-2 text-gray-700">{info.vision}</p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-semibold" style={{ color: brand.dark }}>Mission</h3>
            <p className="mt-2 text-gray-700">{info.mission}</p>
          </GlassCard>
        </div>
      </Section>

      <Section id="events" title="Events" subtitle="Swipe horizontally to explore highlights">
        <HorizontalScroller items={events} colors={brand} />
      </Section>

      <Section id="team" title="Meet the Team" subtitle="The people who make it happen">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((m, idx) => <TeamCard key={idx} m={m} colors={brand} />)}
        </div>
      </Section>

      <Callout colors={brand} />

      <Section id="contact" title="Connect with us" subtitle="Follow our socials and say hello">
        <SocialLinks socials={socials} colors={brand} />
      </Section>

      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {info.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function Feature({ icon, title, text, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
      <div className="h-10 w-10 grid place-items-center rounded-lg" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </motion.div>
  )
}

function GlassCard({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
      {children}
    </motion.div>
  )
}

function Callout({ colors }) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-2xl p-8 sm:p-10" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)` }}>
          <DecorativeCircuits colors={colors} />
          <div className="relative z-10">
            <h3 className="text-white text-2xl font-bold">Ready to build with us?</h3>
            <p className="text-white/80 mt-2">Join events, collaborate on projects, and grow your skills.</p>
            <div className="mt-4 flex gap-3">
              <a href="#events" className="px-5 py-2.5 rounded-lg text-sm font-medium text-black" style={{ background: colors.gold }}>See upcoming events</a>
              <a href="#contact" className="px-5 py-2.5 rounded-lg text-sm font-medium border border-white/30 text-white/90 hover:bg-white/10 transition">Get in touch</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DecorativeCircuits({ colors }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.gold} />
          <stop offset="100%" stopColor={colors.orange} />
        </linearGradient>
      </defs>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} stroke="url(#g1)" strokeWidth="1.5" fill="none">
        <path d="M0 30 Q 120 10, 240 30 T 480 30 T 720 30 T 960 30" />
        <path d="M0 80 Q 120 60, 240 80 T 480 80 T 720 80 T 960 80" />
        <path d="M0 130 Q 120 110, 240 130 T 480 130 T 720 130 T 960 130" />
      </motion.g>
    </svg>
  )
}
