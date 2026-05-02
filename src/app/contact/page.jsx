"use client";

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utr, setUtr] = useState('');
  const [errors, setErrors] = useState({});

  // Custom Modal State
  const [modal, setModal] = useState({
    isOpen: false, title: '', message: '', type: 'info', confirmText: 'OK', onConfirm: null, showCancel: false
  });

  const servicesList = [
    { name: "Astrology & Vastu Consultations", price: 1500, display: "Astrology & Vastu Consultations (₹1,500)" },
    { name: "Remedies & Homas", price: 2000, display: "Remedies & Homas (Base Fee ₹2,000)" },
    { name: "Devata Prathista", price: 5000, display: "Devata Prathista (Base Fee ₹5,000)" },
    { name: "Gems, Crystals, & Rudraksha", price: 800, display: "Gems, Crystals, & Rudraksha (₹800)" },
    { name: "Marriage Compatibility (Kundali Milan)", price: 1200, display: "Marriage Compatibility (₹1,200)" },
    { name: "Career & Finance Astrology", price: 1500, display: "Career & Finance Astrology (₹1,500)" },
    { name: "Other / Not Sure", price: 1000, display: "Other / General Enquiry (₹1,000)" }
  ];

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', dob: '', tob: '', pob: '', service: '', message: ''
  });

  const closeModal = () => setModal({ ...modal, isOpen: false });
  const showModal = (options) => setModal({ isOpen: true, showCancel: false, confirmText: 'OK', onConfirm: closeModal, ...options });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.pob.trim()) newErrors.pob = "Place of birth is required";
    if (!formData.service) newErrors.service = "Please select a service";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // STEP 1: Handle Initial Form Submit (Triggers Disclaimer)
  const handleProceedClick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show Disclaimer Popup
    showModal({
      title: 'Important Disclaimer',
      message: 'Please ensure you fill in the 12-digit Transaction ID (UTR) AFTER making the payment on the next screen. If you do not submit the Transaction ID, your booking will not be considered.',
      type: 'warning',
      confirmText: 'I Understand, Proceed',
      showCancel: true,
      onConfirm: submitFormAndShowQR
    });
  };

  // STEP 1.5: Actually send the email and move to QR Step
  const submitFormAndShowQR = async () => {
    closeModal();
    setIsSubmitting(true);
    try {
      await fetch('/api/email/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStep(2);
    } catch (error) {
      showModal({ title: 'Error', message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // STEP 2: Submit UTR
  const handleConfirmTransaction = async () => {
    if (utr.trim().length < 8) {
      showModal({ title: 'Invalid UTR', message: 'Please enter a valid 12-digit Transaction ID / UTR.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, utr }),
      });
      
      // Success Popup!
      showModal({
        title: 'Booking Submitted!',
        message: 'Your payment details have been submitted successfully. We will verify the transaction and contact you via WhatsApp shortly to schedule your consultation.',
        type: 'success',
        onConfirm: () => {
          closeModal();
          setStep(1);
          setUtr('');
          setFormData({ name: '', phone: '', email: '', dob: '', tob: '', pob: '', service: '', message: '' });
        }
      });
    } catch (error) {
      showModal({ title: 'Submission Failed', message: 'Failed to submit UTR. Please contact us directly on WhatsApp.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = servicesList.find(s => s.name === formData.service);
  const paymentAmount = selectedServiceObj ? selectedServiceObj.price : 1000;
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "9959629678@ybl"; // Fallback added
  const payeeName = process.env.NEXT_PUBLIC_PAYEE_NAME || "Sree Raajarajeswari Jyotisyalayam";
  const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${paymentAmount}&cu=INR`;

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* --- CUSTOM MODAL --- */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className={`text-xl font-bold mb-3 ${modal.type === 'warning' ? 'text-yellow-500' : modal.type === 'error' ? 'text-red-500' : modal.type === 'success' ? 'text-green-500' : 'text-white'}`}>
              {modal.title}
            </h3>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">{modal.message}</p>
            <div className="flex justify-end gap-3">
              {modal.showCancel && (
                <button onClick={closeModal} className="px-4 py-2 text-slate-400 hover:text-white transition text-sm">
                  Cancel
                </button>
              )}
              <button 
                onClick={modal.onConfirm} 
                className={`px-5 py-2 rounded-md font-bold text-sm transition text-black ${modal.type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#d9901c] hover:bg-[#c48218]'}`}
              >
                {modal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- END MODAL --- */}

      <section className="w-full max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Book your consultation securely below. If you have any questions, feel free to reach out via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT COLUMN: Contact Cards & Map */}
          <div>
            <div className="flex items-center gap-4 text-[#d9901c] text-[10px] font-bold tracking-widest uppercase mb-4">
               <span className="w-8 h-[1px] bg-[#d9901c]"></span> REACH US
            </div>
            <h2 className="text-3xl font-serif text-white mb-8">We're Here to <span className="text-[#d9901c]">Guide You</span></h2>

            <div className="space-y-4 mb-8">
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

            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-lg shadow-black/20 w-full h-64 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.8270114460097!2d78.36599009999999!3d17.5634209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d4a713473dd%3A0xaa959a21cb470ca9!2sSree%20Raajarajeswari%20Jyotisyalayam!5e0!3m2!1sen!2sin!4v1777573556176!5m2!1sen!2sin" 
                 className="absolute inset-0 w-full h-full border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
               </iframe>
            </div>
          </div>

          {/* RIGHT COLUMN: Form & QR Code */}
          <div className="bg-[#0b0f19] lg:bg-[#111827] lg:border border-slate-800 p-0 lg:p-8 rounded-2xl relative">
            
            {/* STEP 1: THE FORM */}
            {step === 1 && (
              <form onSubmit={handleProceedClick} className="space-y-5">
                <h3 className="text-2xl font-serif text-white mb-2">Book a Consultation</h3>
                <p className="text-slate-400 text-sm mb-6">Fill in your details to generate your secure payment code.</p>
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Eg. Ramesh Kumar" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Phone / WhatsApp *</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Email (Optional)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                  </div>
                </div>

                {/* DOB & TOB */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Date of Birth *</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c] appearance-none" />
                    {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Time of Birth</label>
                    <input type="time" name="tob" value={formData.tob} onChange={handleChange} className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c] appearance-none" />
                  </div>
                </div>

                {/* Place of Birth */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Place of Birth *</label>
                  <input type="text" name="pob" value={formData.pob} onChange={handleChange} placeholder="Eg. Hyderabad, Telangana" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                  {errors.pob && <p className="text-red-400 text-xs mt-1">{errors.pob}</p>}
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Service Interested In *</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c]">
                    <option value="" disabled>Select a service...</option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service.name}>{service.display}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Your Message / Question</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us briefly what you'd like guidance on..." className="w-full bg-[#0b0f19] border border-slate-700 rounded-md p-4 text-white focus:outline-none focus:border-[#d9901c] resize-none"></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#d9901c] text-black font-bold py-4 rounded-md hover:bg-[#c48218] transition disabled:opacity-70 flex justify-center items-center gap-2">
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: THE PAYMENT QR & UTR INPUT */}
            {step === 2 && (
              <div className="space-y-6 flex flex-col items-center animate-fade-in py-4">
                <div className="w-full bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-lg text-center mb-2">
                  <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider">Step 2: Complete Payment</p>
                </div>

                {/* Explicit UPI ID Above QR */}
                <div className="text-center w-full">
                  <p className="text-slate-400 text-sm mb-1">Paying to:</p>
                  <p className="text-white font-mono text-lg font-bold tracking-wide bg-[#0b0f19] py-2 px-4 rounded border border-slate-700 inline-block">
                    {upiId}
                  </p>
                  <p className="text-[#d9901c] font-bold text-2xl mt-4">Amount: ₹{paymentAmount}</p>
                </div>

                {/* The QR Code */}
                <div className="bg-white p-6 rounded-xl shadow-xl shadow-black/50 mx-auto">
                  <QRCodeCanvas value={upiString} size={220} level={"H"} />
                </div>

                {/* Open in App Button */}
                <a href={upiString} className="w-full max-w-xs mx-auto bg-slate-800 border border-slate-600 text-white font-bold py-3 px-4 rounded-md hover:bg-slate-700 transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  Open in UPI App
                </a>

                {/* Manual UTR Verification */}
                <div className="w-full mt-6 pt-6 border-t border-slate-800">
                  <label className="block text-sm font-bold text-white mb-2 text-center">
                    Fill Your Transaction ID Below
                  </label>
                  <p className="text-xs text-slate-400 text-center mb-4 leading-relaxed">
                    Once you have paid via QR or the button above, <span className="text-[#d9901c]">you MUST enter the 12-digit UTR/Reference No.</span> here to confirm your booking.
                  </p>
                  
                  <input 
                    type="text" 
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder="Enter 12-digit UTR (e.g., 312345678901)" 
                    className="w-full text-center bg-[#0b0f19] border border-slate-700 rounded-md py-4 px-4 text-white text-base md:text-lg tracking-widest placeholder-slate-600 focus:outline-none focus:border-[#d9901c]" 
                  />
                  
                  <button 
                    onClick={handleConfirmTransaction}
                    disabled={isSubmitting || utr.length < 8}
                    className="w-full mt-4 bg-green-600 text-white font-bold py-4 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </button>
                  
                  <button onClick={() => setStep(1)} className="w-full mt-4 text-slate-500 text-sm hover:text-white transition">
                    ← Back to edit details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component for Contact Cards
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