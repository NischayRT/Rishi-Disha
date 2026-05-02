"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  // Updated to match your exact services and prices
  const servicesList = [
    { name: "Astrology & Vastu Consultations", display: "Astrology & Vastu Consultations (₹1,500)" },
    { name: "Remedies & Homas", display: "Remedies & Homas (Enquire/Base Fee)" },
    { name: "Devata Prathista", display: "Devata Prathista (Enquire/Base Fee)" },
    { name: "Gems, Crystals, & Rudraksha", display: "Gems, Crystals, & Rudraksha (₹800)" },
    { name: "Marriage Compatibility (Kundali Milan)", display: "Marriage Compatibility (₹1,200)" },
    { name: "Career & Finance Astrology", display: "Career & Finance Astrology (₹1,500)" },
    { name: "Other / Not Sure", display: "Other / General Enquiry (₹1,000)" }
  ];

  // 1. Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    tob: '',
    pob: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 3. Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone/WhatsApp is required";
    } else if (!/^[+]?[\d\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    // Email is now REQUIRED because we send the automated confirmation here
    if (!formData.email.trim()) {
      newErrors.email = "Email is required for your booking confirmation";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.pob.trim()) newErrors.pob = "Place of birth is required";
    if (!formData.service) newErrors.service = "Please select a service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Razorpay Initialization
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 5. Handle Payment & Submission
  const handlePayment = async () => {
    setIsSubmitting(true);
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to create order");

      // Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Make sure this is in .env.local
        amount: data.amount,
        currency: data.currency,
        name: "Sree Raajarajeswari Jyotisyalayam",
        description: `Booking for ${formData.service}`,
        order_id: data.id,
        handler: function (response) {
          // This runs when payment is successful. Webhook handles the email.
          alert("Payment Successful! Your booking is confirmed. We have sent an email receipt and will contact you via WhatsApp shortly.");
          
          // Clear form after success
          setFormData({
            name: '', phone: '', email: '', dob: '', tob: '', pob: '', service: '', message: ''
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#d9901c",
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response){
         alert(`Payment Failed: ${response.error.description}`);
      });
      
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Payment initiation failed. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handlePayment();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. Top Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
        <div className="flex items-center justify-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-6">
          <span className="w-8 h-[1px] bg-[#d9901c]"></span> GET IN TOUCH <span className="w-8 h-[1px] bg-[#d9901c]"></span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">Contact Us</h1>
        
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          Ready to begin your journey? Reach out via WhatsApp, call, or fill the form below to book your consultation directly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
             href="https://wa.me/919959629678" 
             target="_blank" 
             rel="noopener noreferrer"
             className="px-8 py-3.5 bg-[#25D366] text-white rounded-md hover:bg-[#20b858] transition font-medium flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.347-.272.297-1.039 1.016-1.039 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
             Chat with us
          </a>
          <button className="px-8 py-3.5 bg-transparent border border-[#d9901c] text-[#d9901c] rounded-md hover:bg-[#d9901c]/10 transition font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            Call Now
          </button>
        </div>
      </section>

      {/* 2. Main Content Split */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Contact Info */}
          <div>
            <div className="flex items-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-4">
               <span className="w-8 h-[1px] bg-[#d9901c]"></span> REACH US
            </div>
            <h2 className="text-4xl font-serif text-white mb-4">We're Here to <span className="text-[#d9901c]">Guide You</span></h2>
            <p className="text-slate-400 mb-10 text-sm leading-relaxed">
              Whether you have a specific question or simply want to explore how astrology and Vaastu can help you, we welcome your enquiry. All consultations are personal, confidential, and compassionate.
            </p>

            <div className="space-y-4 mb-6">
              <ContactCard 
                title="Call Us" 
                detail="+91 9959 629 678" 
                sub="Mon – Sat, 9am – 7pm IST" 
                href="tel:+919959629678"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>} 
              />
              <ContactCard 
                title="WhatsApp" 
                detail="+91 9959 629 678" 
                sub="Quick replies, usually within an hour" 
                href="https://wa.me/919959629678"
                icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.347-.272.297-1.039 1.016-1.039 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>} 
              />
              <ContactCard 
                title="Location" 
                detail="Sree Raajarajeswari Jyotisyalayam" 
                sub="Consultations available across India & Online" 
                href="https://maps.app.goo.gl/bWznF9abdovu1rtJ7"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} 
              />
              <ContactCard 
                title="Hours" 
                detail="Mon – Sat: 9am – 7pm" 
                sub="Sunday by appointment only" 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} 
              />
            </div>

            {/* Note Box */}
            <div className="bg-[#d9901c]/5 border border-[#d9901c]/20 p-4 rounded-xl text-sm text-slate-400 mb-6">
               <span className="text-[#d9901c] font-bold">Note:</span> We use Razorpay to securely process your booking via UPI, Cards, or NetBanking.
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg shadow-black/20 w-full h-64 lg:h-72 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.8270114460097!2d78.36599009999999!3d17.5634209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d4a713473dd%3A0xaa959a21cb470ca9!2sSree%20Raajarajeswari%20Jyotisyalayam!5e0!3m2!1sen!2sin!4v1777573556176!5m2!1sen!2sin" 
                 className="absolute inset-0 w-full h-full border-0" 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade">
               </iframe>
            </div>

          </div>

          {/* Right Column - Booking Form */}
          <div className="bg-[#0b0f19] lg:bg-[#111827] lg:border border-slate-800 p-0 lg:p-8 rounded-2xl relative">
            
            {/* Stepper */}
            <div className="flex justify-center items-center gap-4 mb-10 text-xs">
               <div className="flex items-center gap-2 text-white font-medium">
                  <span className="w-6 h-6 rounded-full bg-[#d9901c] text-black flex items-center justify-center font-bold">1</span> Details
               </div>
               <div className="w-8 h-[1px] bg-slate-700"></div>
               <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center">2</span> Payment
               </div>
               <div className="w-8 h-[1px] bg-slate-700"></div>
               <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center">3</span> Confirm
               </div>
            </div>

            <h3 className="text-2xl font-serif text-white mb-2">Book a Consultation</h3>
            <p className="text-slate-400 text-sm mb-8">Fill in your details and proceed to payment to confirm your appointment.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Your Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Eg. Ramesh Kumar" 
                    className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none transition ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`} 
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX" 
                      className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none transition ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`} 
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Email (Required for receipt) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com" 
                      className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none transition ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`} 
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* DOB & TOB Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Date of Birth *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <input 
                      type="date" 
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-4 text-slate-300 focus:outline-none transition appearance-none ${errors.dob ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`} 
                    />
                  </div>
                  {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Time of Birth</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <input 
                      type="time" 
                      name="tob"
                      value={formData.tob}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 pl-10 pr-4 text-slate-300 focus:outline-none focus:border-[#d9901c] transition appearance-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Place of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Place of Birth *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <input 
                    type="text" 
                    name="pob"
                    value={formData.pob}
                    onChange={handleChange}
                    placeholder="Eg. Hyderabad, Telangana, India" 
                    className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none transition ${errors.pob ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`} 
                  />
                </div>
                {errors.pob && <p className="text-red-400 text-xs mt-1">{errors.pob}</p>}
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Service Interested In *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-[#0b0f19] border rounded-md py-3 pl-10 pr-10 text-slate-300 focus:outline-none transition appearance-none ${errors.service ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-[#d9901c]'}`}
                  >
                    <option value="" disabled>Select a service...</option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service.name} className="bg-[#111827] text-white py-2">{service.display}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Your Message / Question</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="Tell us briefly what you'd like guidance on..." 
                  className="w-full bg-[#0b0f19] border border-slate-700 rounded-md p-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#d9901c] transition resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#d9901c] text-black font-bold py-4 rounded-md hover:bg-[#c48218] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Loading UPI Checkout...
                    </span>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                      Proceed to Payment
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-4">
                  Powered by Razorpay. Secure UPI & Card payments available.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Updated Sub-component for the contact cards to support hyperlinks
function ContactCard({ title, detail, sub, icon, href }) {
  return (
    <div className="bg-[#111827] border border-slate-800 p-6 rounded-xl flex items-center gap-5 hover:border-slate-700 transition">
      <div className="w-12 h-12 bg-[#0b0f19] rounded-xl flex items-center justify-center border border-slate-700/50 text-[#d9901c] shrink-0 shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h4>
        
        {href ? (
          <a 
            href={href} 
            target={href.startsWith('http') ? "_blank" : undefined} 
            rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
            className="text-white text-base font-bold hover:text-[#d9901c] transition-colors"
          >
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