'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">
          {/* Left: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative p-10 rounded-3xl border border-[#3FB700]/20 bg-[#0f0f1f] overflow-hidden h-full">
              {/* Background orbs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#3FB700]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#3FB700]/8 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Flag + headline */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">🇮🇪</span>
                  <div>
                    <div className="text-2xl font-bold text-white">Irish-Founded</div>
                    <div className="text-[#3FB700] text-sm font-medium">AI Marketing Agency</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#3FB700]/30 to-transparent mb-8" />

                {/* Speaker photo */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(63,183,0,0.3)',
                    boxShadow: '0 0 20px rgba(63,183,0,0.15)',
                  }}
                >
                  <Image
                    src="/images/speaker.png"
                    alt="Padraig Rice speaking"
                    width={600}
                    height={450}
                    style={{ width: '100%', height: '450px', display: 'block', objectFit: 'cover', objectPosition: 'center 20%' }}
                  />
                  {/* Bottom fade into card background */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80px',
                      background: 'linear-gradient(to bottom, transparent, #0f0f1f)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Founder */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Founded by</div>
                  <div className="text-white font-semibold">Padraig Rice</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-[#3FB700] text-xs font-semibold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#3FB700]/20 bg-[#3FB700]/8">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Proven Strategies Delivered With
              <br />
              <span className="bg-gradient-to-r from-[#3FB700] to-[#6fe800] bg-clip-text text-transparent">
                The Latest Technology
              </span>
            </h2>

            <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
              <p>
                PRice AI Marketing is a technology driven digital marketing agency founded by Padraig Rice. We help ambitious businesses around the world grow faster using the latest tools and automation systems.
              </p>
              <p>
                We build the machine. You reap the results.
              </p>
            </div>

            <div className="mt-10">
              <a
                href="https://calendly.com/padraigrice"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#3FB700] hover:bg-[#38a600] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(63,183,0,0.35)] hover:shadow-[0_0_40px_rgba(63,183,0,0.55)] hover:-translate-y-0.5"
              >
                Work With Us
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
