"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomeClient() {
  // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupData, setPopupData] = useState({
    name: '', phone: '', email: '', dob: '', message: ''
  });
  const [popupStatus, setPopupStatus] = useState('idle'); // idle, submitting, success

  // Trigger popup 3 seconds after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('popupClosed')) {
        setShowPopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('popupClosed', 'true'); // Prevent it from opening again on refresh
  };

  const handlePopupChange = (e) => {
    setPopupData({ ...popupData, [e.target.name]: e.target.value });
  };

  const submitFreeConsultation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/email/free-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(popupData),
      });
      setPopupStatus('success');
      setTimeout(closePopup, 3000); // Auto close after 3 seconds
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { title: "Kundali / Birth Chart Reading", desc: "Unlock the secrets of your destiny through a detailed analysis of your birth chart, planetary positions, and life path.", icon: "☉" },
    { title: "Vaastu Shastra Consultation", desc: "Harmonize your living and working spaces with the five elements to invite prosperity, health, and peace.", icon: "⊕" },
    { title: "Remedies & Homas", desc: "Authentic Vedic remedies, poojas, and homas performed with strict adherence to shastras to mitigate planetary doshas.", icon: "🔥" },
    { title: "Devata Prathista", desc: "Expert guidance and conduction of deity installation ceremonies (Prathista) for homes and temples.", icon: "🕉" },
    { title: "Gems, Crystals, & Rudraksha", desc: "Personalized recommendations for authentic gemstones, healing crystals, and Rudraksha to enhance planetary benefits.", icon: "💎" },
    { title: "Career & Finance Astrology", desc: "Navigate career decisions and financial opportunities aligned with your planetary strengths.", icon: "♄" },
  ];

  const stats = [
    { value: "20+", label: "Years of Experience", sub: "Decades of dedicated practice" },
    { value: "5000+", label: "Clients Served", sub: "Across India and worldwide" },
    { value: "98%", label: "Accurate Predictions", sub: "Verified by satisfied clients" },
    { value: "360º", label: "Holistic Approach", sub: "Astrology + Vaastu combined" },
  ];

  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", review: "RishiDisha transformed our home with Vaastu guidance. Within months, we noticed a remarkable shift in family harmony and financial stability. Truly life-changing." },
    { name: "Rajesh Verma", location: "Delhi", review: "The Kundali reading was incredibly accurate. The career guidance I received helped me make a pivotal decision that changed my professional life for the better." },
    { name: "Anita Patel", location: "Ahmedabad", review: "Marriage compatibility consultation gave us deep insights. We are now happily married and grateful for the wisdom shared. Highly recommend to every family." }
  ];

  return (
    <div className="flex flex-col items-center w-full overflow-hidden relative">
      
      {/* WELCOME POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
            
            {/* Close Button */}
            <button onClick={closePopup} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="bg-gradient-to-b p-8">
              {popupStatus === 'success' ? (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Request Received</h3>
                  <p className="text-slate-400">We will contact you shortly for your free consultation.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-serif text-white mb-2">Free Consultation</h3>
                    <p className="text-slate-400 text-sm">Have questions? Let's discuss your cosmic path. Fill out the details below.</p>
                  </div>

                  <form onSubmit={submitFreeConsultation} className="space-y-4">
                    <div>
                      <input type="text" name="name" required value={popupData.name} onChange={handlePopupChange} placeholder="Your Name *" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="phone" required value={popupData.phone} onChange={handlePopupChange} placeholder="Phone No. *" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                      <input 
                        type="text" 
                        name="dob" 
                        required 
                        value={popupData.dob} 
                        onChange={handlePopupChange} 
                        placeholder="Date of Birth *"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
                        className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c] appearance-none" 
                        />
                    </div>
                    <div>
                      <input type="email" name="email" value={popupData.email} onChange={handlePopupChange} placeholder="Email (Optional)" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                    </div>
                    <div>
                      <textarea name="message" required value={popupData.message} onChange={handlePopupChange} rows="3" placeholder="Briefly describe what you need guidance on... *" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c] resize-none"></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#d9901c] text-black font-bold py-3.5 rounded-md hover:bg-[#c48218] transition disabled:opacity-70 mt-2">
                      {isSubmitting ? "Submitting..." : "Claim Free Consultation"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 relative flex flex-col lg:flex-row items-center justify-between min-h-[85vh]">
        
        {/* Left Side: Text Content */}
        <div className="relative z-40 max-w-2xl w-full lg:w-1/2 pt-3 lg:pt-0">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-2">
            <div className="flex items-center gap-3 md:gap-4 text-[#d9901c] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-[#d9901c]"></span>
              Sree Raajarajeswari Jyotisyalayam
            </div>
            <img 
              src="/banner-1.webp" 
              alt="Jyotisyalayam Banner" 
              className="h-14 md:h-20 object-contain w-auto mt-2 sm:mt-0" 
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-2 leading-[1.1] uppercase">
            Garimella VV <br />
            <span className="text-[#d9901c]">Satyanarayana Sharma</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-slate-300 tracking-widest uppercase mb-4 font-medium">
            AstroVaastu Consultant
          </h2>
          
          <div className="mb-10">
             <p className="text-[#d9901c] text-sm font-bold uppercase tracking-wider mb-4">Services:</p>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-slate-300 text-sm">
               <li>
                 <Link href="/services#astrology-vastu-consultations" className="flex items-center gap-2 hover:text-[#d9901c] transition-colors cursor-pointer w-fit">
                   <span className="text-[#d9901c] text-lg leading-none">•</span> Astrology & Vastu Consultations
                 </Link>
               </li>
               <li>
                 <Link href="/services#remedies-homas" className="flex items-center gap-2 hover:text-[#d9901c] transition-colors cursor-pointer w-fit">
                   <span className="text-[#d9901c] text-lg leading-none">•</span> Remedies & Homas
                 </Link>
               </li>
               <li>
                 <Link href="/services#devata-prathista" className="flex items-center gap-2 hover:text-[#d9901c] transition-colors cursor-pointer w-fit">
                   <span className="text-[#d9901c] text-lg leading-none">•</span> Devata Prathista
                 </Link>
               </li>
               <li>
                 <Link href="/services#gems-crystals-rudraksha" className="flex items-center gap-2 hover:text-[#d9901c] transition-colors cursor-pointer w-fit">
                   <span className="text-[#d9901c] text-lg leading-none">•</span> Gems, Crystals, & Rudraksha
                 </Link>
               </li>
             </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 relative z-50">
            <a 
              href="https://wa.me/919959629678" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.347-.272.297-1.039 1.016-1.039 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with us
            </a>
            <Link href="/contact" className="px-8 py-3.5 bg-transparent border border-[#d9901c] text-[#d9901c] rounded-md hover:bg-[#d9901c]/10 transition font-medium flex items-center justify-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Call Now
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-2"><span className="w-1 h-1 bg-[#d9901c] rounded-full"></span> 20+ Years Experience</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 bg-[#d9901c] rounded-full"></span> 5000+ Clients</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 bg-[#d9901c] rounded-full"></span> Online & In Person</span>
          </div>
        </div>

        {/* Right Side: Exact Image Composition */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end items-end h-[450px] lg:h-[650px] mt-12 lg:mt-0">
          
          <div className="relative w-full h-full flex justify-center items-end animate-float-profile">
            <div className="absolute top-[40%] lg:top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] pointer-events-none opacity-40 mix-blend-screen">
              <img 
                src="/hero-animation.webp" 
                alt="Cosmic Chart Animation" 
                className="w-full h-full object-contain animate-[spin_40s_linear_infinite]"
              />
            </div>

            <img 
              src="/banner.webp"
              alt="Garimella VV Satyanarayana Sharma"
              className="relative z-30 bottom-0 w-[300px] sm:w-[350px] lg:w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none" 
            />
          </div>
          
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="w-full bg-[#0d1323] py-24 border-t border-slate-800 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-4">
               <span className="w-8 h-[1px] bg-[#d9901c]"></span> WHAT WE OFFER <span className="w-8 h-[1px] bg-[#d9901c]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Our Sacred Services</h2>
            <p className="text-slate-400">Rooted in Vedic tradition, our consultations are tailored to your unique life journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-[#111827] border border-slate-800 p-8 rounded-xl hover:border-[#d9901c]/30 transition group cursor-pointer relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d9901c]/5 rounded-full blur-2xl"></div>
                
                <div className="w-12 h-12 border border-slate-700 rounded-lg flex items-center justify-center text-[#d9901c] text-xl mb-6 bg-[#0b0f19]">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#d9901c] transition">{service.title}</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">{service.desc}</p>
                <Link href={`/services#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-[#d9901c] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span className="text-lg leading-none">›</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Us Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
               <div className="flex items-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-6">
                  <span className="w-8 h-[1px] bg-[#d9901c]"></span> WHY US
               </div>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                  Trusted by Thousands, <span className="text-[#d9901c]">Guided by Wisdom</span>
               </h2>
               <p className="text-slate-400 text-base leading-relaxed mb-10">
                  With over two decades of dedicated practice in Vedic Astrology and Vaastu Shastra, we offer a rare combination of ancient knowledge and compassionate guidance — helping you navigate life's most important decisions.
               </p>
               <button 
                 onClick={() => setShowPopup(true)} // Opens the new popup manually
                 className="px-8 py-3.5 bg-transparent border border-[#d9901c] text-[#d9901c] rounded-md hover:bg-[#d9901c]/10 transition font-medium flex items-center justify-center gap-2"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 Book a Free Consultation
               </button>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
               {stats.map((stat, i) => (
                  <div key={i} className="bg-[#111827] border border-slate-800 p-8 rounded-xl flex flex-col justify-center">
                     <span className="text-3xl font-serif text-[#d9901c] mb-2">{stat.value}</span>
                     <h4 className="text-white font-bold text-sm mb-1">{stat.label}</h4>
                     <p className="text-slate-500 text-xs">{stat.sub}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Testimonials Snippet Section */}
      <section className="w-full bg-[#0d1323] py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-4">
               <span className="w-8 h-[1px] bg-[#d9901c]"></span> CLIENT STORIES <span className="w-8 h-[1px] bg-[#d9901c]"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Lives Transformed</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="glow-top-border bg-[#0b0f19] border border-slate-800/80 p-8 rounded-xl flex flex-col h-full hover:border-slate-700 transition duration-300 shadow-lg shadow-black/20"
              >
                {/* Outlined 99 Quote Icon */}
                <div className="mb-6">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d9901c] opacity-60">
                     <path d="M10 11.5C10 13.9853 7.98528 16 5.5 16C4.46087 16 3.50369 15.6483 2.73699 15.0538C2.26829 14.6905 2 14.1166 2 13.5186V6.5C2 5.11929 3.11929 4 4.5 4H7.5C8.88071 4 10 5.11929 10 6.5V11.5Z" stroke="currentColor" strokeWidth="1.2"/>
                     <path d="M22 11.5C22 13.9853 19.9853 16 17.5 16C16.4609 16 15.5037 15.6483 14.737 15.0538C14.2683 14.6905 14 14.1166 14 13.5186V6.5C14 5.11929 15.1193 4 16.5 4H19.5C20.8807 4 22 5.11929 22 6.5V11.5Z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">"{t.review}"</p>
                
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <h4 className="text-white text-sm font-bold">{t.name}</h4>
                    <p className="text-slate-500 text-xs mt-1">{t.location}</p>
                  </div>
                  
                  {/* 5 Stars */}
                  <div className="flex gap-1 text-[#d9901c]">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
         <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
               <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 border border-slate-800 rounded-full animate-pulse"></div>
                  <div className="absolute inset-8 border border-slate-700 rounded-full"></div>
                  <div className="absolute inset-16 border border-slate-600 rounded-full"></div>
                  <div className="absolute inset-24 border border-[#d9901c]/30 bg-[#d9901c]/10 rounded-full flex items-center justify-center">
                     <div className="w-3 h-3 bg-[#d9901c] rounded-full ring-4 ring-[#d9901c]/20"></div>
                  </div>
               </div>
            </div>

            <div className="w-full lg:w-2/3 text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-4">
                  <span className="w-8 h-[1px] bg-[#d9901c] hidden lg:block"></span> BEGIN YOUR JOURNEY
               </div>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                  Ready to Transform <span className="text-[#d9901c]">Your Life?</span>
               </h2>
               <p className="text-slate-400 text-base mb-10 max-w-2xl mx-auto lg:mx-0">
                  Take the first step toward clarity, harmony, and purpose. Reach out for a personal consultation — available online and in-person across India.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <a 
                    href="https://wa.me/919959629678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.347-.272.297-1.039 1.016-1.039 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat with us
                  </a>
                  <Link href="/contact" className="px-8 py-3.5 bg-transparent border border-[#d9901c] text-[#d9901c] rounded-md hover:bg-[#d9901c]/10 transition font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call Now
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}