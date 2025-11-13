import { Shell } from '../components/Shell'

export default function AboutPage({ info, colors }){
  return (
    <Shell brandName={info.name} colors={colors}>
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.dark }}>About {info.name}</h1>
          <p className="mt-4 text-gray-700 leading-relaxed">{info.about}</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
              <h3 className="font-semibold" style={{ color: colors.dark }}>Vision</h3>
              <p className="mt-2 text-gray-700">{info.vision}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
              <h3 className="font-semibold" style={{ color: colors.dark }}>Mission</h3>
              <p className="mt-2 text-gray-700">{info.mission}</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
