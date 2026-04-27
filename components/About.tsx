'use client'

import { motion } from 'framer-motion'

const pillars = [
  { label: 'Technology-First Approach', icon: '⚡' },
  { label: 'AI-Powered Systems', icon: '🤖' },
  { label: 'Continuous Optimisation', icon: '📈' },
  { label: 'Transparent Results', icon: '🎯' },
]

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative p-10 rounded-3xl border border-[#6366f1]/20 bg-[#0f0f1f] overflow-hidden">
              {/* Background orbs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#6366f1]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#8b5cf6]/8 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Flag + headline */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl">🇮🇪</span>
                  <div>
                    <div className="text-2xl font-bold text-white">Irish-Founded</div>
                    <div className="text-[#6366f1] text-sm font-medium">AI Marketing Agency</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#6366f1]/30 to-transparent mb-8" />

                {/* Pillars */}
                <div className="space-y-4">
                  {pillars.map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5"
                    >
                      <span className="text-xl">{pillar.icon}</span>
                      <span className="text-gray-200 font-medium text-sm">{pillar.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Founder */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Founded by</div>
                  <div className="text-white font-semibold">Padraig Rice</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-[#6366f1] text-xs font-semibold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/8">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              A Different Kind
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
                of Agency
              </span>
            </h2>

            <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
              <p>
                Price AI Marketing is an Irish AI-powered digital marketing agency founded by Padraig Rice. We help ambitious businesses across Ireland grow faster using the latest AI tools and automation systems.
              </p>
              <p>
                We are not a traditional agency — we are a technology-first team that delivers more output, faster results and smarter systems than anything you have worked with before.
              </p>
            </div>

            <div className="mt-10">
              <a
                href="https://calendly.com/padraigrice"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#6366f1] hover:bg-[#7678ed] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] hover:-translate-y-0.5"
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
