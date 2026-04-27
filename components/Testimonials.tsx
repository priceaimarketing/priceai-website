'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Testimonials() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="testimonials"
      className="py-28 lg:py-36 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070c] via-[#09091a] to-[#07070c]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6366f1]/25 to-transparent" />

      {/* Background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#6366f1]/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#6366f1] text-xs font-semibold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#6366f1]/20 bg-[#6366f1]/8">
            Client Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-10 md:p-14 rounded-3xl border border-[#6366f1]/20 bg-[#0f0f1f] shadow-[0_0_80px_rgba(99,102,241,0.08)] overflow-hidden"
        >
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#6366f1]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#8b5cf6]/8 rounded-full blur-2xl" />

          {/* Large decorative quote */}
          <div className="absolute top-6 left-8 text-[120px] leading-none text-[#6366f1]/15 font-serif select-none pointer-events-none">
            &ldquo;
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-8 relative z-10">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#6366f1]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="relative z-10 text-xl md:text-2xl text-gray-100 leading-relaxed mb-10 font-light">
            &ldquo;Padraig delivered huge growth and efficiency with how we approach content at Annora. Our YouTube series and LinkedIn strategy he built alongside us has been directly responsible for bringing in multiple five-figure deals every month. If you&apos;re a business looking to actually convert through content, he&apos;s the person to call.&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-5 relative z-10">
            {/* Avatar */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#6366f1]/40">
              {!imgError ? (
                <Image
                  src="/images/patrick-byrne.jpg"
                  alt="Patrick Byrne"
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PB</span>
                </div>
              )}
            </div>

            {/* Name & company */}
            <div>
              <div className="font-semibold text-white text-lg">Patrick Byrne</div>
              <div className="text-gray-400">
                CEO,{' '}
                <a
                  href="https://annora.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6366f1] hover:text-[#818cf8] transition-colors duration-200 font-medium"
                >
                  Annora AI
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
