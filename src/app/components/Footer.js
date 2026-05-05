import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-slate-800 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
          <img 
            src="/logo.webp" 
            alt="RishiDisha Logo" 
            className="h-12 w-auto object-contain" 
          />
          <span className="text-2xl font-serif font-semibold text-[#d9901c]">RishiDisha</span>
        </div>
        
          </div>
          <p className="text-sm text-slate-400 mb-4">Guiding you through life's journey with the ancient wisdom of Astrology and Vaastu Shastra.</p>
          <p className="text-[#d9901c] text-sm">★★★★★ 500+ Happy Clients</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-[#d9901c] transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#d9901c] transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-[#d9901c] transition-colors">About Us</Link></li>
            <li><Link href="/testimonials" className="hover:text-[#d9901c] transition-colors">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Our Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/services#astrology-vastu-consultations" className="hover:text-[#d9901c] transition-colors">Astrology & Vastu</Link></li>
            <li><Link href="/services#remedies-homas" className="hover:text-[#d9901c] transition-colors">Remedies & Homas</Link></li>
            <li><Link href="/services#devata-prathista" className="hover:text-[#d9901c] transition-colors">Devata Prathista</Link></li>
            <li><Link href="/services#gems-crystals-rudraksha" className="hover:text-[#d9901c] transition-colors">Gems & Rudraksha</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact Us</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li>
              <span className="block text-white">Call Us</span>
              <a href="tel:+919959629678" className="hover:text-[#d9901c] transition-colors">+91 9959 629 678</a>
            </li>
            <li>
              <span className="block text-white">WhatsApp</span>
              <a href="https://wa.me/919959629678" target="_blank" rel="noopener noreferrer" className="hover:text-[#d9901c] transition-colors">+91 9959 629 678</a>
            </li>
            <li>
              <span className="block text-white">Location</span>
              <a 
                href="https://maps.app.goo.gl/bWznF9abdovu1rtJ7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#d9901c] transition-colors inline-block"
              >
                Sri Raajarajeswari Jyotisyalayam<br />
                <span>Hyderabad, Telangana</span><br />
                <span>India (Online & In-Person)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-slate-500">
        <p>© 2026 Sree Raajarajeswari Jyotisyalayam. All rights reserved.</p>
        <p>Ancient Wisdom • Modern Guidance • Timeless Harmony</p>
      </div>
    </footer>
  );
}