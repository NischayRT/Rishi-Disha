import './globals.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Lato, Cormorant_Garamond } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: 'RishiDisha | Cosmic Wisdom', 
  description: 'Expert Astrology and Vaastu Shastra consultancy', 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${cormorant.variable} bg-[#0b0f19] text-slate-300 scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans">
        
        <Navbar />

        <div className="fixed bottom-6 right-6 z-50">
           <WhatsAppButton text="Chat" className="rounded-full shadow-lg shadow-black/50 py-4 px-6" /> 
        </div>

        <main className="flex-grow pt-20">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  )
}