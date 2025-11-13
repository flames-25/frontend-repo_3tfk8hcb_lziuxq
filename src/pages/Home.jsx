import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Rocket, Users, Target } from 'lucide-react'
import { Shell } from '../components/Shell'

export default function Home({ info, colors }){
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <Shell brandName={info.name} colors={colors}>
      <section ref={containerRef} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(80% 80% at 10% 10%, ${colors.primary}22 0%, transparent 60%), radial-gradient(70% 70% at 90% 20%, ${colors.gold}22 0%, transparent 60%)` }} />
        <motion.div className="absolute -top-16 -left-16 h-56 w-56 rounded-full blur-2xl opacity-50" style={{ background: colors.primary, y: y1 }} />
        <motion.div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full blur-2xl opacity-40" style={{ background: colors.gold, y: y2 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#0D274D0d', color: colors.dark }}>
              <Rocket className="w-4 h-4" />
              {info.tagline}
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: colors.dark }}>{info.name}</h1>
            <p className="mt-4 text-gray-700 leading-relaxed">{info.about}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/events" className="px-5 py-2.5 rounded-lg text-white shadow hover:shadow-md transition" style={{ background: colors.primary }}>Explore Events</a>
              <a href="/team" className="px-5 py-2.5 rounded-lg border border-black/10 hover:bg-black/5 transition">Meet the Team</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-xl bg-gradient-to-br from-white to-gray-100 border border-black/5 overflow-hidden">
              <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.gold} 100%)` }} />
              <div className="absolute inset-6 rounded-xl bg-white/80 backdrop-blur border border-white/60" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#0D274D' }}>About Us</h2>
            <p className="mt-2 text-gray-600">Who we are and what we do</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Feature color={colors.primary} icon={<Users className='w-6 h-6' />} title='Community First' text='Peer-led learning with inclusive, beginner-friendly spaces.' />
            <Feature color={colors.orange} icon={<Target className='w-6 h-6' />} title='Hands-on' text='Workshops, live demos, and projects that ship.' />
            <Feature color={colors.gold} icon={<Rocket className='w-6 h-6' />} title='Industry-ready' text='Talks from alumni and pros to stay ahead of the curve.' />
          </div>
        </div>
      </section>
    </Shell>
  )
}

function Feature({ icon, title, text, color }){
  return (
    <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
      <div className="h-10 w-10 grid place-items-center rounded-lg" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </div>
  )
}
