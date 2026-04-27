'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.65], ['0%', '8%'])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        {/* Dot-grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(63,183,0,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Gradient orbs */}
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#3FB700]/15 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#3FB700]/12 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#3FB700]/5 blur-[160px]" />

        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#07070c] to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07070c] to-transparent" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#3FB700]/30 bg-[#3FB700]/10 text-[#52d400] text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#3FB700] animate-pulse" />
          Ireland&apos;s AI-Powered Marketing Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight"
        >
          <span className="text-white">AI-Powered Marketing</span>
          <br />
          <span className="bg-gradient-to-r from-[#3FB700] via-[#52d400] to-[#6fe800] bg-clip-text text-transparent">
            That Works While You Sleep
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We build intelligent content systems and marketing automation for ambitious Irish businesses
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://calendly.com/padraigrice"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-[#3FB700] hover:bg-[#38a600] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(63,183,0,0.45)] hover:shadow-[0_0_55px_rgba(63,183,0,0.65)] hover:-translate-y-1 text-lg w-full sm:w-auto"
          >
            Book a Free Call
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/15 hover:border-[#3FB700]/50 text-white font-semibold rounded-xl hover:bg-[#3FB700]/8 transition-all duration-300 hover:-translate-y-1 text-lg backdrop-blur-sm w-full sm:w-auto"
          >
            See Our Services
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[#3FB700]/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
