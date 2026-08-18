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
    <main className="relative min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
      >
        {/* Photo */}
        <div className="relative w-full aspect-[3/4]">
          <Image
            src="/images/speaker.png"
            alt={CONTACT.fullName}
            fill
            sizes="384px"
            className="object-cover object-top grayscale"
            priority
          />

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 leading-none translate-y-px">
            <svg
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              className="block w-full h-[56px]"
            >
              <path
                fill="#3FB700"
                d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white px-8 pt-2 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {CONTACT.fullName}
            </h1>
            <p className="mt-1 text-[#3FB700] font-semibold text-sm tracking-wide">
              {CONTACT.title}, {CONTACT.company}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-5 space-y-2 text-sm"
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className="block text-gray-600 hover:text-gray-900 transition-colors"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="block text-gray-600 hover:text-gray-900 transition-colors"
            >
              {CONTACT.phone}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-7 space-y-3"
          >
            <button
              onClick={downloadVCard}
              className="w-full px-6 py-4 bg-[#3FB700] hover:bg-[#38a600] text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(63,183,0,0.35)] hover:shadow-[0_10px_40px_rgba(63,183,0,0.5)] hover:-translate-y-0.5"
            >
              Save Contact
            </button>
            <a
              href="https://calendly.com/padraigrice"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-4 border-2 border-[#3FB700] text-gray-900 font-semibold rounded-xl hover:bg-[#3FB700]/8 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Call
            </a>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
