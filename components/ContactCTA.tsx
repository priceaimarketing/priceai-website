'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-28 lg:py-40 px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#07070c] to-[#0a0a1a]" />

      {/* Large center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#3FB700]/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#3FB700]/6 rounded-full blur-[80px]" />

      {/* Top & bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3FB700]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3FB700]/30 to-transparent" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(63,183,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(63,183,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Padraig's photo */}
          <div className="flex-shrink-0">
            <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-[#3FB700]/40 shadow-[0_0_50px_rgba(63,183,0,0.25)]">
              <Image
                src="/images/padraig-rice.jpg"
                alt="Padraig Rice"
                fill
                sizes="(max-width: 1024px) 176px, 208px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-[#3FB700] text-xs font-semibold tracking-[0.2em] uppercase mb-6 px-4 py-1.5 rounded-full border border-[#3FB700]/20 bg-[#3FB700]/8">
              Get Started Today
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Ready to Grow
              <br />
              <span className="bg-gradient-to-r from-[#3FB700] via-[#52d400] to-[#6fe800] bg-clip-text text-transparent">
                With AI?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              Book a free strategy call with Padraig today. No pressure, no jargon — just an honest conversation about how AI can transform your marketing.
            </p>

            <motion.a
              href="https://calendly.com/padraigrice"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#3FB700] hover:bg-[#38a600] text-white font-bold rounded-2xl text-xl transition-colors duration-200 shadow-[0_0_50px_rgba(63,183,0,0.5)] hover:shadow-[0_0_70px_rgba(63,183,0,0.7)]"
            >
              Book Your Free Call
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <p className="mt-6 text-gray-600 text-sm">
              Free 30-minute call · No commitment required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
