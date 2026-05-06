'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuditStickyBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  function openModal() {
    setModalOpen(true)
    setStatus('idle')
    setEmail('')
    setErrorMsg('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/audit-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* Sticky bar */}
      <AnimatePresence>
        {visible && !dismissed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090f] border-t border-[#3FB700]/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
              <button
                onClick={openModal}
                className="flex-1 text-left group"
                aria-label="Get your free AI marketing audit"
              >
                <span className="text-sm md:text-base font-semibold text-white group-hover:text-[#3FB700] transition-colors duration-200">
                  🎯 Get Your Free AI Marketing Audit →
                </span>
              </button>

              <div className="flex items-center gap-3 shrink-0">
                <motion.button
                  onClick={openModal}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="hidden sm:block px-5 py-2 rounded-lg bg-[#3FB700] text-white text-sm font-semibold hover:bg-[#46cc00] transition-colors duration-200 shadow-[0_0_18px_rgba(63,183,0,0.3)]"
                >
                  Claim Yours Free
                </motion.button>

                <button
                  onClick={() => setDismissed(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Dismiss"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 bottom-16 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50"
            >
              <div className="bg-[#0f0f1f] border border-white/10 rounded-2xl p-8 relative shadow-2xl">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#3FB700]/40 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {status === 'success' ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-[#3FB700]/15 text-[#3FB700] flex items-center justify-center mx-auto mb-5">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Check your inbox.</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Padraig will personally review your marketing and get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="inline-block text-[#3FB700] text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border border-[#3FB700]/20 bg-[#3FB700]/8">
                      Free Audit
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                      Get Your Free AI Marketing Audit
                    </h3>

                    <p className="text-gray-400 text-[15px] leading-relaxed mb-6">
                      We&apos;ll analyse your marketing, find the gaps, and show you exactly where AI can save you time and make you money.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your work email"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-[#07070c] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#3FB700]/50 focus:ring-1 focus:ring-[#3FB700]/25 transition-all duration-200 text-[15px]"
                      />
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="w-full py-4 rounded-xl font-semibold text-white text-[15px] bg-[#3FB700] hover:bg-[#46cc00] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-[0_0_25px_rgba(63,183,0,0.3)]"
                      >
                        {status === 'loading' ? 'Sending...' : 'Claim Your Free Audit'}
                      </motion.button>
                    </form>

                    {errorMsg && (
                      <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>
                    )}

                    <p className="mt-4 text-gray-600 text-xs text-center">
                      No spam. No pitch. Just a free audit delivered to your inbox.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
