import Link from 'next/link';

export default function AboutPage() {
  const credentials = [
    {
      icon: "📖",
      title: "Vedic Astrology",
      desc: "Jyotish Visharad — certified practitioner of classical Vedic astrology"
    },
    {
      icon: "📜",
      title: "Vaastu Shastra",
      desc: "Vaastu Acharya — advanced certification in traditional Vaastu principles"
    },
    {
      icon: "⭐",
      title: "Numerology",
      desc: "Certified numerologist trained in both Vedic and Pythagorean systems"
    },
    {
      icon: "👥",
      title: "Counselling",
      desc: "Trained in holistic life counselling to complement astrological guidance"
    }
  ];

  const timeline = [
    { year: "2004", event: "Began formal study of Vedic Astrology under Pandit Shri Rameshwar Sharma" },
    { year: "2007", event: "Completed Jyotish Visharad certification with distinction" },
    { year: "2009", event: "Expanded practice to include Vaastu Shastra and Numerology" },
    { year: "2012", event: "Opened first consultancy office; served over 500 clients in first year" },
    { year: "2016", event: "Launched online consultations, reaching clients across India and abroad" },
    { year: "2020", event: "Crossed 5,000 satisfied clients milestone" },
    { year: "2024", event: "RishiDisha recognised among top astrology consultancies in the region" }
  ];

  const philosophies = [
    {
      icon: "♡",
      title: "Compassionate Guidance",
      desc: "Every consultation is approached with empathy. We understand that you come with real concerns — and you deserve honest, caring guidance, not vague predictions."
    },
    {
      icon: "🕮",
      title: "Rooted in Tradition",
      desc: "Our practice is grounded in authentic Vedic texts — Brihat Parashara Hora Shastra, Vaastu Vidya, and classical Jyotish — not modern interpretations."
    },
    {
      icon: "★",
      title: "Practical Remedies",
      desc: "We believe remedies should be simple, affordable, and actionable. No unnecessary rituals or expensive gemstones — only what genuinely helps."
    },
    {
      icon: "🔒",
      title: "Confidentiality",
      desc: "Your personal details, birth information, and life circumstances are held in complete confidence. Trust is the foundation of every consultation."
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">About RishiDisha</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Two decades of dedicated practice, thousands of lives guided, one unwavering purpose — helping you find your true direction.
        </p>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Block */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#111827]">
              <img 
                src="/profile.webp" 
                alt="Garimella VV Satyanarayana Sharma" 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition duration-500"
              />
              {/* Floating Name Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0b0f19]/80 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl">
                <h3 className="text-white font-serif font-bold text-lg">Garimella VV Satyanarayana Sharma</h3>
                <p className="text-amber-500 text-xs font-medium tracking-wide">Jyotish Visharad • Vaastu Acharya</p>
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="w-full lg:w-1/2">
            <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">The Founder</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-tight">
              A Life Devoted to <span className="text-amber-500">Vedic Wisdom</span>
            </h2>
            
            <div className="space-y-6 text-slate-400 text-sm leading-relaxed mb-8">
              <p>
                Pandit Garimella VV Satyanarayana Sharma has spent over two decades immersed in the sacred sciences of Jyotish (Vedic Astrology), Vaastu Shastra, and Numerology. Born into a family with a deep reverence for Vedic tradition, his journey began as a young student under the tutelage of renowned astrologer Pandit Shri Rameshwar Sharma.
              </p>
              <p>
                Over the years, he has guided more than 5,000 individuals and families — helping them navigate career crossroads, find compatible life partners, harmonize their homes and offices, and discover their life purpose through the lens of the cosmos.
              </p>
              <p>
                His approach is rooted in classical texts yet deeply practical. He believes that astrology and Vaastu are not tools of fatalism, but maps of possibility — empowering you to make wiser choices, aligned with your natural strengths and cosmic timing.
              </p>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <span className="text-slate-400 text-sm">Trusted by 5,000+ clients</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" /></svg>
                Book a Consultation
              </button>
              <button className="px-6 py-2.5 bg-transparent border border-slate-700 text-amber-500 rounded-md hover:bg-slate-800 transition font-medium text-sm flex items-center gap-2">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="w-full bg-[#0d1323] py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">Qualifications</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Credentials & Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred, i) => (
              <div key={i} className="bg-[#111827] border border-slate-800 p-6 rounded-xl flex items-start gap-4 hover:border-slate-600 transition">
                <div className="w-12 h-12 bg-[#0b0f19] rounded-lg border border-slate-700 flex items-center justify-center text-amber-500 text-xl shrink-0">
                  {cred.icon}
                </div>
                <div>
                  <h3 className="text-white font-serif text-lg mb-2">{cred.title}</h3>
                  <p className="text-slate-400 text-sm">{cred.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey Section */}
      <section className="max-w-3xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">The Journey</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white">Two Decades of Practice</h2>
        </div>

        <div className="relative border-l border-amber-500/20 ml-4 md:ml-8 space-y-12 pb-8">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-[#0b0f19]"></div>
              
              <h4 className="text-amber-500 font-bold text-sm mb-2">{item.year}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="text-center mb-16">
          <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">Our Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white">What We Stand For</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophies.map((phil, i) => (
            <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-xl">
              <div className="w-10 h-10 border border-slate-700 rounded-lg flex items-center justify-center text-amber-500 mb-6 bg-[#0b0f19]">
                {phil.icon}
              </div>
              <h3 className="text-white font-serif text-xl mb-3">{phil.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{phil.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-12 text-center relative overflow-hidden">
           {/* Subtle glow effect behind the text */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
           
           <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Begin Your Consultation</h2>
           <p className="text-slate-400 text-sm mb-10 max-w-lg mx-auto">
              Reach out today for a personal, confidential consultation — online or in-person.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button className="px-8 py-3 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium text-sm flex items-center justify-center gap-2">
                WhatsApp Us
              </button>
              <button className="px-8 py-3 bg-transparent border border-amber-500 text-amber-500 rounded-md hover:bg-amber-500/10 transition font-medium text-sm flex items-center justify-center gap-2">
                Call Now
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}