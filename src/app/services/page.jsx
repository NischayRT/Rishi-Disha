import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: "astrology-vastu-consultations",
      icon: "☉",
      subtitle: "Decode the Blueprint of Your Life",
      title: "Astrology & Vastu Consultations",
      description: "A comprehensive analysis combining the cosmic map of your soul's journey with spatial harmony. We reveal your strengths, challenges, karmic patterns, and align your living space to attract prosperity and health.",
      price: "Starting ₹1,500",
      includes: [
        "Complete Kundali preparation and analysis",
        "Detailed floor plan and Vaastu zone assessment",
        "Life areas: health, wealth, career, relationships",
        "Practical remedies without major construction",
        "Written report + 60-minute consultation"
      ]
    },
    {
      id: "remedies-homas",
      icon: "🔥",
      subtitle: "Mitigate Doshas with Sacred Fire",
      title: "Remedies & Homas",
      description: "Authentic Vedic remedies, poojas, and homas performed with strict adherence to shastras. These powerful spiritual procedures are designed to pacify malefic planetary influences and invoke divine blessings.",
      price: "Enquire for Pricing",
      includes: [
        "Identification of specific planetary doshas",
        "Prescription of precise Vedic mantras",
        "Conduction of Navagraha Shanti Homas",
        "Specialized poojas for marriage and career obstacles",
        "Guidance on daily ritual practices"
      ]
    },
    {
      id: "devata-prathista",
      icon: "🕉",
      subtitle: "Invoke the Divine Presence",
      title: "Devata Prathista",
      description: "Expert guidance and conduction of deity installation ceremonies (Prathista) for homes and temples. Ensure the sacred idols are consecrated with life-force (Prana Prathista) according to ancient Agama Shastras.",
      price: "Enquire for Pricing",
      includes: [
        "Selection of auspicious Muhurta for installation",
        "Yantra and Navaratna placement guidance",
        "Complete Prana Prathista rituals",
        "Kumbhabhishekam procedures",
        "Guidelines for Nitya Pooja (daily worship)"
      ]
    },
    {
      id: "gems-crystals-rudraksha",
      icon: "💎",
      subtitle: "Harness Planetary Frequencies",
      title: "Gems, Crystals, & Rudraksha",
      description: "Personalized recommendations for authentic gemstones, healing crystals, and Rudraksha to enhance planetary benefits. We analyze your birth chart to prescribe stones that boost your natural strengths and protect against negativity.",
      price: "Starting ₹800",
      includes: [
        "Detailed gemstone suitability analysis",
        "Weight and metal specifications for rings",
        "Auspicious date and time for wearing",
        "Authentic Mukhi Rudraksha matching",
        "Purification and energization (Pran Pratishtha) instructions"
      ]
    },
    {
      id: "marriage-compatibility",
      icon: "♃",
      subtitle: "Ensure a Blessed and Harmonious Union",
      title: "Marriage Compatibility (Kundali Milan)",
      description: "Kundali Milan is the traditional Vedic method of matching horoscopes before marriage. We analyze 36 gunas (qualities), Mangal dosha, and planetary compatibility to give you a comprehensive picture of the relationship's potential.",
      price: "Starting ₹1,200",
      includes: [
        "36-point Ashtakoot guna matching",
        "Mangal dosha analysis and remedies",
        "Navamsha chart compatibility",
        "Emotional, physical, and spiritual compatibility",
        "Auspicious muhurta (wedding date) suggestion"
      ]
    },
    {
      id: "career-finance-astrology",
      icon: "♄",
      subtitle: "Navigate Your Professional Path with Clarity",
      title: "Career & Finance Astrology",
      description: "Planetary influences significantly shape career trajectories and financial cycles. Our career and finance consultation identifies your most favorable periods for growth, the right professional fields aligned with your chart, and strategies to overcome obstacles.",
      price: "Starting ₹1,500",
      includes: [
        "Career aptitude analysis from birth chart",
        "Favorable periods for job change or business",
        "Financial dasha analysis and wealth yogas",
        "Business partnership compatibility",
        "Actionable remedies for career growth"
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#d9901c] tracking-widest text-sm font-semibold mb-4 uppercase">Our Offerings</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Sacred Services</h1>
        <p className="text-slate-400 text-lg">
          Ancient Vedic wisdom applied to your modern life — every consultation is personal, precise, and purposeful.
        </p>
      </section>

      {/* Services List Section */}
      <section className="max-w-7xl mx-auto px-4 pb-24 space-y-8">
        {services.map((service, index) => {
          // Odd-indexed cards (1, 3, 5…) swap column order so the
          // "What's Included" panel appears on the left.
          const swapOrder = index % 2 !== 0;

          return (
            // Anchor wrapper: invisible, sits above the card so the
            // sticky nav never overlaps the card header on scroll.
            <div key={service.id} className="relative">
              {/* Scroll target sits 96px above the card (adjust to match your navbar height) */}
              <span id={service.id} className="absolute -top-24" aria-hidden="true" />

              <div className="glow-top-border bg-[#111827] border border-slate-800 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-12">

                {/* Main Info Block */}
                <div className={`flex-1 ${swapOrder ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center text-[#d9901c] text-2xl shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <p className="text-[#d9901c] text-xs font-bold tracking-wider uppercase mb-1">{service.subtitle}</p>
                      <h2 className="text-2xl font-serif text-white">{service.title}</h2>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="inline-block px-4 py-2 border border-[#d9901c]/30 bg-[#d9901c]/10 text-[#d9901c] rounded-md text-sm font-medium mb-8">
                    {service.price}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="px-6 py-2.5 bg-[#d9901c] text-black rounded-md hover:bg-[#c48218] transition font-bold text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a Session
                    </Link>
                    <button className="px-6 py-2.5 bg-transparent border border-slate-700 text-slate-300 rounded-md hover:bg-slate-800 transition font-medium text-sm flex items-center gap-2">
                      Call to Enquire
                    </button>
                  </div>
                </div>

                {/* What's Included Block */}
                <div className={`flex-1 bg-[#0b0f19]/50 rounded-xl p-8 border border-slate-800/50 ${swapOrder ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h3 className="text-[#d9901c] text-xs font-bold tracking-wider uppercase mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start text-slate-300 text-sm">
                        <svg className="w-5 h-5 text-[#d9901c] mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full bg-[#0d1323] py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#d9901c] tracking-widest text-sm font-semibold mb-4 uppercase">Get Started Today</p>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Not Sure Which Service is Right for You?</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Reach out and we'll guide you to the consultation that best fits your needs. First-time enquiries are always welcome.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-[#d9901c] text-black rounded-md hover:bg-[#c48218] transition font-bold flex items-center justify-center gap-2">
              Book a Session
            </Link>
            <button className="px-8 py-3 bg-transparent border border-[#d9901c] text-[#d9901c] rounded-md hover:bg-[#d9901c]/10 transition font-medium flex items-center justify-center gap-2">
              Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}