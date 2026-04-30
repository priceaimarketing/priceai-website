'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'About', id: 'about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-[#07070c]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left lockup — logo + brand name side by side */}
        <Link href="/" aria-label="PRice AI Marketing home" className="flex items-center gap-[10px] hover:opacity-85 transition-opacity">
          <Image
            src="/images/logo.png"
            alt="PRice AI Marketing"
            width={260}
            height={65}
            className="h-[65px] w-auto"
            priority
          />
          <span className="text-[#3FB700] text-[23px] md:text-[27px] font-bold tracking-tight leading-none whitespace-nowrap">
            PRice AI Marketing
          </span>
        </Link>

        {/* Right nav */}
        <div className="justify-self-end">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium tracking-wide whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://calendly.com/padraigrice"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#3FB700] hover:bg-[#38a600] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(63,183,0,0.35)] hover:shadow-[0_0_30px_rgba(63,183,0,0.55)] hover:-translate-y-0.5"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-1 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — brand centered above stacked links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-center text-gray-300 hover:text-white transition-colors py-3 text-base font-medium border-b border-white/5 last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3">
                <a
                  href="https://calendly.com/padraigrice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-5 py-3 bg-[#3FB700] hover:bg-[#38a600] text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(63,183,0,0.35)]"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
