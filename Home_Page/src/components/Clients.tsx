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
  'HealthWorld Hospitals',
  'Mission Hospitals',
]

export function Clients() {
  return (
    <section className="relative -mt-8 overflow-hidden px-6 pb-20 pt-24 md:-mt-12 md:pb-24 md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(194,65,12,0.14),transparent_28%),radial-gradient(circle_at_50%_18%,rgba(201,168,124,0.1),transparent_34%),linear-gradient(180deg,rgba(18,9,3,0.08)_0%,rgba(18,9,3,0.5)_22%,rgba(18,9,3,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-coffee-mid/40 via-coffee-black/20 to-transparent" />

      <div className="absolute left-1/2 top-[-15rem] h-[20rem] w-[150%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(39,20,11,0.96)_0%,rgba(23,11,6,0.98)_45%,rgba(18,9,3,0.92)_62%,rgba(18,9,3,0)_82%)]" />
      <div className="absolute left-1/2 top-[4.75rem] h-20 w-[82%] -translate-x-1/2 rounded-full bg-orange-burnt/18 blur-3xl md:top-[5.75rem] md:h-24" />
      <div className="absolute left-1/2 top-[5.1rem] h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-sand/55 to-transparent blur-sm md:top-[6.2rem]" />
      <div className="absolute left-1/2 top-[5rem] h-[3px] w-[44%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-orange-burnt/75 to-transparent blur-[2px] md:top-[6.05rem]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center reveal-block">
          <p className="mb-3 text-sm font-body uppercase tracking-[0.32em] text-sand/70">
            Trusted By Leading Healthcare Institutions
          </p>
          <h2 className="text-h3 text-ivory md:text-h2 font-display">
            Our Partners
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
          <div className="absolute inset-x-8 top-1/2 h-20 -translate-y-1/2 rounded-full bg-sand/10 blur-3xl md:h-24" />
          <div className="absolute inset-x-12 top-1/2 h-12 -translate-y-1/2 rounded-full bg-orange-burnt/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-full border border-sand/10 bg-[linear-gradient(90deg,rgba(18,9,3,0.08)_0%,rgba(36,18,10,0.8)_20%,rgba(28,15,8,0.92)_50%,rgba(36,18,10,0.8)_80%,rgba(18,9,3,0.08)_100%)] px-3 py-5 backdrop-blur-md md:px-6">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sand/30 to-transparent" />
            <InfiniteSlider gap={56} duration={38} className="py-2">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="flex flex-shrink-0 items-center justify-center px-6 py-3 md:px-8"
                >
                  <h3 className="whitespace-nowrap font-display text-2xl font-semibold tracking-[-0.02em] text-sand/70 transition-colors duration-300 hover:text-ivory md:text-[2rem]">
                    {client}
                  </h3>
                </div>
              ))}
            </InfiniteSlider>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-coffee-black via-coffee-black/90 to-transparent md:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-coffee-black via-coffee-black/90 to-transparent md:w-28" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-coffee-black/10 to-coffee-black/60" />
      </div>
    </section>
  )
}
