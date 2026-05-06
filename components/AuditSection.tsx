'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AuditSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
    <section id="audit" className="py-28 lg:py-36 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070c] via-[#080f06] to-[#07070c]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3FB700]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3FB700]/25 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#3FB700]/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="inline-block text-[#3FB700] text-xs font-semibold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#3FB700]/20 bg-[#3FB700]/8">
            Free Audit
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get Your Free AI Marketing Audit
          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            We'll analyse your current marketing, identify the gaps, and show you exactly where AI can save you time and make you money. No pitch. Just value.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {status === 'success' ? (
            <div className="p-10 rounded-2xl border border-[#3FB700]/25 bg-[#3FB700]/6">
              <div className="w-14 h-14 rounded-full bg-[#3FB700]/15 text-[#3FB700] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">You're in — check your inbox.</h3>
              <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
                Padraig will personally review your marketing and get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  className="flex-1 px-5 py-4 rounded-xl bg-[#0f0f1f] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#3FB700]/50 focus:ring-1 focus:ring-[#3FB700]/25 transition-all duration-200 text-[15px]"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="px-7 py-4 rounded-xl font-semibold text-white text-[15px] bg-[#3FB700] hover:bg-[#46cc00] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-[0_0_30px_rgba(63,183,0,0.35)] whitespace-nowrap"
                >
                  {status === 'loading' ? 'Sending...' : 'Claim Your Free Audit'}
                </motion.button>
              </form>

              {errorMsg && (
                <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>
              )}

              <p className="mt-4 text-gray-600 text-sm">
                No spam. No pitch. Just a free audit delivered to your inbox.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
