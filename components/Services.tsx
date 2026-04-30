'use client'

import { motion } from 'framer-motion'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Content Creation & Social Media Management',
    description:
      'Professional content that converts and strategic social media management delivered by us through your vision.',
    accent: '#3FB700',
    glow: 'hover:shadow-[0_8px_40px_rgba(63,183,0,0.2)]',
    border: 'hover:border-[#3FB700]/50',
    dot: 'bg-[#3FB700]',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Web Design & Development',
    description:
      'Modern websites deployed instantly. Clean design and built to convert.',
    accent: '#3FB700',
    glow: 'hover:shadow-[0_8px_40px_rgba(63,183,0,0.2)]',
    border: 'hover:border-[#3FB700]/50',
    dot: 'bg-[#3FB700]',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'SEO & Lead Generation',
    description:
      'AI-driven SEO strategies and automated lead generation systems that never clock off.',
    accent: '#3FB700',
    glow: 'hover:shadow-[0_8px_40px_rgba(63,183,0,0.2)]',
    border: 'hover:border-[#3FB700]/50',
    dot: 'bg-[#3FB700]',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
}

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-36 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[#3FB700] text-xs font-semibold tracking-[0.2em] uppercase mb-5 px-4 py-1.5 rounded-full border border-[#3FB700]/20 bg-[#3FB700]/8">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Services Built for the AI Age
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We combine cutting-edge AI with proven marketing strategy to deliver results traditional agencies simply cannot match.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
              className={`group relative p-8 rounded-2xl border border-white/8 bg-[#0f0f1f] ${service.glow} ${service.border} transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ backgroundColor: service.accent + '20' }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: service.accent + '15', color: service.accent }}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4 leading-snug">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-[15px]">{service.description}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
