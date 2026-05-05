import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PRice AI Marketing | AI-Powered Marketing for Irish Businesses',
  description:
    'We build intelligent content systems and marketing automation for ambitious Irish businesses. AI content, web design, SEO and lead generation.',
  keywords:
    'AI marketing Ireland, digital marketing, AI content, social media automation, SEO Ireland',
  alternates: {
    canonical: 'https://priceaimarketing.ie',
  },
  openGraph: {
    title: 'PRice AI Marketing | AI-Powered Marketing That Works While You Sleep',
    description:
      'Intelligent content systems and marketing automation for ambitious Irish businesses.',
    url: 'https://priceaimarketing.ie',
    siteName: 'PRice AI Marketing',
    locale: 'en_IE',
    type: 'website',
    images: [
      {
        url: 'https://priceaimarketing.ie/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PRice AI Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRice AI Marketing | AI-Powered Marketing for Irish Businesses',
    description:
      'Intelligent content systems and marketing automation for ambitious Irish businesses.',
    images: ['https://priceaimarketing.ie/images/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://priceaimarketing.ie/#organization',
      name: 'PRice AI Marketing',
      url: 'https://priceaimarketing.ie',
      logo: {
        '@type': 'ImageObject',
        url: 'https://priceaimarketing.ie/images/logo.png',
      },
      email: 'padraig@priceaimarketing.ie',
      sameAs: [
        'https://www.linkedin.com/in/padraig-rice',
        'https://www.instagram.com/priceaimarketing',
      ],
      founder: { '@id': 'https://priceaimarketing.ie/#padraig-rice' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://priceaimarketing.ie/#localbusiness',
      name: 'PRice AI Marketing',
      url: 'https://priceaimarketing.ie',
      email: 'padraig@priceaimarketing.ie',
      description:
        'AI-powered digital marketing agency based in Ireland. We build intelligent content systems and marketing automation for ambitious businesses.',
      areaServed: [
        { '@type': 'Country', name: 'Ireland' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      priceRange: '€€',
      image: 'https://priceaimarketing.ie/images/og-image.png',
      sameAs: [
        'https://www.linkedin.com/in/padraig-rice',
        'https://www.instagram.com/priceaimarketing',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://priceaimarketing.ie/#padraig-rice',
      name: 'Padraig Rice',
      jobTitle: 'Founder',
      worksFor: { '@id': 'https://priceaimarketing.ie/#organization' },
      url: 'https://priceaimarketing.ie',
      sameAs: ['https://www.linkedin.com/in/padraig-rice'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IE" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-[#07070c] text-white antialiased`}>
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
