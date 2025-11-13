import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar({ color = '#FFD700' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 })
  return <motion.div className="absolute left-0 top-0 h-1 w-full origin-left" style={{ scaleX, background: color }} />
}

function Navbar({ brand, colors }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const linkCls = (path) => `hover:opacity-80 ${location.pathname === path ? 'text-black' : 'text-gray-700'}`
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="relative h-1"><ScrollProgressBar color={colors.gold} /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl shadow-inner" style={{ background: colors.primary }} />
            <span className="font-semibold text-lg" style={{ color: colors.dark }}>{brand || 'Our Club'}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/about" className={linkCls('/about')}>About</Link>
            <Link to="/events" className={linkCls('/events')}>Events</Link>
            <Link to="/team" className={linkCls('/team')}>Team</Link>
            <Link to="/contact" className={linkCls('/contact')}>Contact</Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Menu">
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black mb-1.5" />
            <div className="w-6 h-0.5 bg-black" />
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-sm">
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/events" onClick={() => setOpen(false)}>Events</Link>
            <Link to="/team" onClick={() => setOpen(false)}>Team</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </header>
  )
}

export function Shell({ brandName, colors, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-800">
      <Navbar brand={brandName} colors={colors} />
      {children}
      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
