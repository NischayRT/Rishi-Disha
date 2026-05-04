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
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'), 
  title: {
    default: 'RishiDisha | Best AstroVaastu Consultant in Hyderabad',
    template: '%s | RishiDisha', 
  },
  description: 'Looking for the best jyotish in Hyderabad? Sree Raajarajeswari Jyotisyalayam offers top-rated Vedic Astrology, Kundali Reading, and the best Vaastu Shastra consultancy by Garimella VV Satyanarayana Sharma in Telangana.',
  keywords: [
    'best astrology',
    'best AstroVaastu Consultant',
    'best Vaastu Consultant',
    'best jyotish in hyderabad',
    'best jyotish in telangana',
    'top astrologer in Hyderabad',
    'famous astrologer in Telangana',
    'Vedic Astrology Expert near me',
    'Accurate Kundali Reading',
    'Marriage Compatibility Astrology',
    'Garimella VV Satyanarayana Sharma',
    'Sree Raajarajeswari Jyotisyalayam',
    'Dosha Remedies and Homas'
  ],
  authors: [{ name: 'Garimella VV Satyanarayana Sharma' }],
  creator: 'RishiDisha',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://yourdomain.com',
    title: 'RishiDisha | Best AstroVaastu Consultant in Hyderabad',
    description: 'Consult the best jyotish in Telangana for expert Vedic Astrology and Vaastu Shastra with over 20 years of trusted experience.',
    siteName: 'RishiDisha',
    images: [
      {
        url: '/banner.webp', 
        width: 1200,
        height: 630,
        alt: 'Sree Raajarajeswari Jyotisyalayam - Best Astrologer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RishiDisha | Best Jyotish & Vaastu Consultant',
    description: 'Expert Vedic Astrology and Vaastu Shastra consultancy. Online & in-person in Hyderabad, Telangana.',
    images: ['/banner.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  
  // 2. JSON-LD SCHEMA MARKUP FOR LOCAL SEO
  // This helps Google Maps and Google Search understand exactly who you are
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sree Raajarajeswari Jyotisyalayam (RishiDisha)",
    "image": "https://yourdomain.com/logo.webp", // Update domain
    "url": "https://yourdomain.com", // Update domain
    "telephone": "+919959629678",
    "founder": {
      "@type": "Person",
      "name": "Garimella VV Satyanarayana Sharma"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Praneeth Nagar Road", // Update with exact street if needed
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.5634209,
      "longitude": 78.3659901
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "priceRange": "₹₹" 
  };

  return (
    <html lang="en" className={`${lato.variable} ${cormorant.variable} bg-[#0b0f19] text-slate-300 scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans">
        
        {/* Inject JSON-LD into the head invisibly */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />

        <div className="fixed bottom-6 right-6 z-50">
           <WhatsAppButton text="Chat" className="rounded-full shadow-lg shadow-black/50 py-4 px-6" /> 
        </div>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  )
}