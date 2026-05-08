"use client";

import Link from 'next/link';

export default function ContactClient() {
  return (
    <div className="w-full flex flex-col items-center relative min-h-screen bg-[#0b0f19]">
      <section className="w-full max-w-7xl mx-auto px-4 py-16 lg:py-24 relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Get in Touch</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Reach out via phone, WhatsApp, or visit our location. Ready to start your journey? Book a consultation below.
          </p>
          <div className="mt-8">
            <Link href="/book" className="inline-block px-10 py-4 bg-[#d9901c] text-black font-bold rounded-md hover:bg-[#c48218] transition text-lg shadow-lg shadow-[#d9901c]/20">
              Book a Consultation Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* CONTACT CARDS */}
          <div className="space-y-4">
            <ContactCard 
              title="Call Us" detail="+91 9959 629 678" sub="Mon – Sat, 9am – 7pm IST" href="tel:+919959629678"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>} 
            />
            <ContactCard 
              title="WhatsApp" detail="+91 9959 629 678" sub="Quick replies, usually within an hour" href="https://wa.me/919959629678"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.347-.272.297-1.039 1.016-1.039 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>} 
            />
            <ContactCard 
              title="Location" detail="Sree Raajarajeswari Jyotisyalayam" sub="Consultations available across India & Online" href="https://maps.app.goo.gl/bWznF9abdovu1rtJ7"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} 
            />
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg shadow-black/20 w-full h-full min-h-[300px] relative bg-[#111827]">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.8270114460097!2d78.36599009999999!3d17.5634209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d4a713473dd%3A0xaa959a21cb470ca9!2sSree%20Raajarajeswari%20Jyotisyalayam!5e0!3m2!1sen!2sin!4v1777573556176!5m2!1sen!2sin" 
               className="absolute inset-0 w-full h-full border-0 mix-blend-luminosity hover:mix-blend-normal transition duration-500" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
             </iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ title, detail, sub, icon, href }) {
  return (
    <div className="bg-[#111827] border border-slate-800 p-6 rounded-xl flex items-center gap-5 hover:border-slate-700 transition">
      <div className="w-12 h-12 bg-[#0b0f19] rounded-xl flex items-center justify-center border border-slate-700/50 text-[#d9901c] shrink-0 shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h4>
        {href ? (
          <a href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} className="text-white text-base font-bold hover:text-[#d9901c] transition-colors">
            {detail}
          </a>
        ) : (
          <p className="text-white text-base font-bold">{detail}</p>
        )}
        <p className="text-slate-500 text-xs mt-1">{sub}</p>
      </div>
    </div>
  );
}