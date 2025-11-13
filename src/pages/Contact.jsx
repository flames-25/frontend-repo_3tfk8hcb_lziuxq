import { Shell } from '../components/Shell'
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react'

export default function ContactPage({ info, colors, socials = [] }){
  const icons = { instagram: Instagram, twitter: Twitter, x: Twitter, linkedin: Linkedin, email: Mail }
  return (
    <Shell brandName={info.name} colors={colors}>
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.dark }}>Get in touch</h1>
          <p className="mt-2 text-gray-600">Follow our socials and say hello.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {(socials || []).map((s, i) => {
              const key = (s.platform || '').toLowerCase()
              const Icon = icons[key] || ((props) => <span {...props}>🌐</span>)
              return (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white shadow" style={{ background: colors.dark }}>
                  <Icon className="w-4 h-4" />
                  <span>{s.platform}</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </Shell>
  )
}
