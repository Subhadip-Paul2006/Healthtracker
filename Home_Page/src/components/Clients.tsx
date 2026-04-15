import { Sparkles } from './ui/sparkles'
import { InfiniteSlider } from './ui/infinite-slider'

const clients = [
  'Apollo Hospitals',
  'Fortis Healthcare',
  'Max Healthcare',
  'AIIMS',
  'Medanta',
  'Narayana Health',
  'Manipal Hospitals',
  'Columbia Asia',
  'Wockhardt Hospitals',
  'Cloudnine Hospitals',
]

export function Clients() {
  return (
    <section className="relative py-16 bg-coffee-black overflow-hidden">
      {/* Sparkles background effect */}
      <Sparkles
        className="absolute inset-0"
        size={1.5}
        density={400}
        speed={0.5}
        opacity={0.6}
        color="#C9A87C"
        minOpacity={0.2}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-10 reveal-block">
          <p className="text-sand/70 text-sm font-body tracking-wider uppercase mb-2">
            Trusted By Leading Healthcare Institutions
          </p>
          <h2 className="text-h3 md:text-h2 text-ivory font-display">
            Our Partners
          </h2>
        </div>

        {/* Client names slider */}
        <div className="relative">
          <InfiniteSlider gap={48} duration={30}>
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 flex items-center justify-center"
              >
                <h3 className="text-xl md:text-2xl font-display font-semibold text-sand/60 hover:text-sand transition-colors duration-300 whitespace-nowrap">
                  {client}
                </h3>
              </div>
            ))}
          </InfiniteSlider>

          {/* Progressive blur on edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-coffee-black to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-coffee-black to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
