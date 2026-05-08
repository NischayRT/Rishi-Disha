"use client";

import Link from 'next/link';

export default function TestimonialsClient() {
  const stats = [
    { value: "5000+", label: "Clients Served" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "20+", label: "Years Experience" },
    { value: "4.9★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      service: "Vaastu Shastra Consultation",
      review: "RishiDisha transformed our home with Vaastu guidance. Within months, we noticed a remarkable shift in family harmony and financial stability. Pandit ji explained everything clearly and the remedies were practical — no major renovations needed.",
      initial: "P"
    },
    {
      name: "Rajesh Verma",
      location: "Delhi",
      service: "Kundali / Birth Chart Reading",
      review: "The Kundali reading was incredibly accurate. The career guidance I received helped me make a pivotal decision that changed my professional life for the better. I was skeptical before, but the precision of the predictions was remarkable.",
      initial: "R"
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad",
      service: "Marriage Compatibility",
      review: "Marriage compatibility consultation gave us deep insights. We are now happily married and grateful for the wisdom shared. Highly recommend to every family considering marriage.",
      initial: "A"
    },
    {
      name: "Vikram Nair",
      location: "Bangalore",
      service: "Career & Finance Astrology",
      review: "I consulted RishiDisha during a very uncertain phase in my career. The analysis of my planetary periods was spot-on. I followed the guidance and switched industries at the right time — it's been two years and my career has never been better.",
      initial: "V"
    },
    {
      name: "Deepa Krishnamurthy",
      location: "Hyderabad",
      service: "Vaastu for Office",
      review: "We had persistent issues in our office — low morale, frequent conflicts, and stagnant business. After the Vaastu audit and implementing the suggested changes, the atmosphere improved dramatically within weeks. Business has grown 40% since.",
      initial: "D"
    },
    {
      name: "Amit & Sunita Gupta",
      location: "Pune",
      service: "Numerology",
      review: "The numerology session was eye-opening. Pandit ji suggested a small change to our daughter's name spelling and explained the reasoning in detail. The transformation in her confidence and academic performance has been wonderful.",
      initial: "A"
    },
    {
      name: "Kavitha Reddy",
      location: "Visakhapatnam",
      service: "Kundali / Birth Chart Reading",
      review: "I have consulted many astrologers over the years, but RishiDisha stands apart. The reading was thorough, compassionate, and practical. No vague predictions — specific timelines and actionable guidance. Truly exceptional.",
      initial: "K"
    },
    {
      name: "Mohan Lal Agarwal",
      location: "Jaipur",
      service: "Vaastu Shastra Consultation",
      review: "We consulted Pandit ji before purchasing our new home. His Vaastu assessment saved us from a property with serious doshas. The home we eventually chose has brought nothing but prosperity and happiness to our family.",
      initial: "M"
    },
    {
      name: "Shalini Mehta",
      location: "Surat",
      service: "Career & Finance Astrology",
      review: "After years of financial struggle, I finally sought astrological guidance. The dasha analysis revealed why I had been facing obstacles and when things would improve. The remedies were simple and affordable. Life has genuinely turned around.",
      initial: "S"
    }
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center relative overflow-hidden">
        {/* Background Graphic Placeholder */}
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-96 h-96 border border-slate-800 rounded-full opacity-20 pointer-events-none"></div>

        <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">Client Stories</p>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Lives Transformed</h1>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          Thousands of individuals and families have found clarity, harmony, and purpose through RishiDisha. Here are their stories.
        </p>
        <div className="flex items-center justify-center gap-2">
            <div className="flex text-amber-500 text-sm">★★★★★</div>
            <span className="text-slate-400 text-sm">4.9 / 5 from 5,000+ consultations</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-3xl font-serif text-amber-500 mb-2">{stat.value}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="glow-top-border bg-[#111827] border border-slate-800 rounded-2xl p-8 md:p-12 relative">
          <div className="absolute top-8 left-8 text-slate-800 opacity-30 text-6xl font-serif leading-none">"</div>
          <div className="relative z-10 pl-8 md:pl-12">
            <p className="text-slate-300 text-lg md:text-xl italic leading-relaxed mb-8">
              "We were hesitant at first, but Pandit ji's Kundali Milan analysis was extraordinarily detailed and accurate. He identified a Mangal dosha we were unaware of and provided simple, effective remedies. Our wedding was planned on the muhurta he suggested, and we have been happily married for three years now. His guidance gave our families immense peace of mind."
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
               <div>
                  <h4 className="text-white font-bold">Suresh & Meena Iyer</h4>
                  <p className="text-slate-500 text-xs mt-1">Chennai • Marriage Compatibility & Kundali Reading</p>
               </div>
               <div className="flex text-amber-500 text-sm">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glow-top-border bg-[#111827] border border-slate-800 p-8 rounded-xl flex flex-col h-full hover:border-slate-700 transition">
              <div className="flex text-amber-500 text-[10px] mb-4">★★★★★</div>
              <span className="inline-block px-3 py-1 bg-[#0b0f19] border border-slate-700 rounded-full text-amber-500 text-[10px] uppercase tracking-wider mb-6 w-fit">
                {t.service}
              </span>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">"{t.review}"</p>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-[#0b0f19] border border-slate-700 flex items-center justify-center text-amber-500 font-serif font-bold shrink-0">
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="w-full bg-[#0d1323] py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <p className="text-amber-500 tracking-widest text-sm font-semibold mb-4 uppercase">Your Story Awaits</p>
           <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Ready to Write Your <span className="text-amber-500">Success Story?</span></h2>
           <p className="text-slate-400 text-sm mb-10 max-w-lg mx-auto">
              Join thousands of satisfied clients. Book your personal consultation today — online or in-person.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/919959629678" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium text-sm flex items-center justify-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>

                WhatsApp Us
              </a>
              <a href="tel:+919959629678" className="px-8 py-3 bg-transparent border border-amber-500 text-amber-500 rounded-md hover:bg-amber-500/10 transition font-medium text-sm flex items-center justify-center gap-2">
                Call Now
              </a>
           </div>
        </div>
      </section>
    </div>
  );
}