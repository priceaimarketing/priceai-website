'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const CONTACT = {
  firstName: 'Padraig',
  lastName: 'Rice',
  fullName: 'Padraig Rice',
  title: 'Founder',
  company: 'PRice AI Marketing',
  email: 'padraig@priceaimarketing.ie',
  phone: '+353 85 83 88 596',
  website: 'https://priceaimarketing.ie',
}

const ease = [0.22, 1, 0.36, 1] as const

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
    `FN:${CONTACT.fullName}`,
    `ORG:${CONTACT.company}`,
    `TITLE:${CONTACT.title}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    `TEL;TYPE=CELL:${CONTACT.phone}`,
    `URL:${CONTACT.website}`,
    'END:VCARD',
  ].join('\r\n')

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'padraig-rice.vcf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function CardPage() {
  return (
    <main className="relative min-h-screen bg-[#07070c] overflow-hidden flex items-center justify-center px-6 py-16">
      {/* Ambient brand glow, consistent with Hero */}
      <div className="pointer-events-none absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#3FB700]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#3FB700]/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#0f0f1f]/80 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(63,183,0,0.12)]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="relative mx-auto w-40 h-40 rounded-full overflow-hidden border-2 border-[#3FB700]/40 shadow-[0_0_35px_rgba(63,183,0,0.35)]"
        >
          <Image
            src="/images/speaker.png"
            alt={CONTACT.fullName}
            fill
            sizes="160px"
            className="object-cover grayscale"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-6 text-center"
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">{CONTACT.fullName}</h1>
          <p className="mt-1 text-[#3FB700] font-semibold text-sm tracking-wide">
            {CONTACT.title}, {CONTACT.company}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="mt-6 space-y-2 text-center text-sm"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            {CONTACT.email}
          </a>
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className="block text-gray-300 hover:text-white transition-colors"
          >
            {CONTACT.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease }}
          className="mt-8 space-y-3"
        >
          <button
            onClick={downloadVCard}
            className="w-full px-6 py-4 bg-[#3FB700] hover:bg-[#38a600] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(63,183,0,0.4)] hover:shadow-[0_0_40px_rgba(63,183,0,0.6)] hover:-translate-y-0.5"
          >
            Save Contact
          </button>
          <a
            href="https://calendly.com/padraigrice"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-6 py-4 border border-white/15 hover:border-[#3FB700]/50 text-white font-semibold rounded-xl hover:bg-[#3FB700]/8 transition-all duration-300 hover:-translate-y-0.5"
          >
            Book a Call
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-8 flex justify-center"
        >
          <Image
            src="/images/logo.new.png"
            alt="PRice AI Marketing"
            width={32}
            height={32}
            className="opacity-60"
          />
        </motion.div>
      </motion.div>
    </main>
  )
}
