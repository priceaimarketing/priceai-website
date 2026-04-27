import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Price AI Marketing | AI-Powered Marketing for Irish Businesses',
  description:
    'We build intelligent content systems and marketing automation for ambitious Irish businesses. AI content, web design, SEO and lead generation.',
  keywords:
    'AI marketing Ireland, digital marketing, AI content, social media automation, SEO Ireland',
  openGraph: {
    title: 'Price AI Marketing | AI-Powered Marketing That Works While You Sleep',
    description:
      'Intelligent content systems and marketing automation for ambitious Irish businesses.',
    url: 'https://priceaimarketing.ie',
    siteName: 'Price AI Marketing',
    locale: 'en_IE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#07070c] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
