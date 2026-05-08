"use client";

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function BookClient() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utr, setUtr] = useState('');
  const [errors, setErrors] = useState({});

  // Custom Modal State with Timer Logic
  const [modal, setModal] = useState({
    isOpen: false, title: '', message: '', type: 'info', confirmText: 'OK', onConfirm: null, showCancel: false, requireTimer: false
  });
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer Countdown Effect
  useEffect(() => {
    let timerId;
    if (modal.isOpen && modal.requireTimer && timeLeft > 0) {
      timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [modal.isOpen, modal.requireTimer, timeLeft]);

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
  
  const showModal = (options) => {
    setModal({ isOpen: true, showCancel: false, confirmText: 'OK', onConfirm: closeModal, requireTimer: false, ...options });
    if (options.requireTimer) setTimeLeft(3); // Start 3-second timer
  };

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

  const handleProceedClick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    showModal({
      title: 'Important Disclaimer',
      message: 'Please ensure you fill in the 12-digit Transaction ID (UTR) AFTER making the payment on the next screen. If you do not submit the Transaction ID, your booking will not be considered.',
      type: 'warning',
      confirmText: 'Yes, I confirm',
      showCancel: true,
      requireTimer: true,
      onConfirm: submitFormAndShowQR
    });
  };

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
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "sai.healingtouch-2@okhdfcbank";
  const payeeName = process.env.NEXT_PUBLIC_PAYEE_NAME || "Sree Raajarajeswari Jyotisyalayam";
  
  // App-Specific UPI Strings
  const queryParams = `?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${paymentAmount}&cu=INR`;
  const upiString = `upi://pay${queryParams}`; // Generic Chooser
  const gpayString = `tez://upi/pay${queryParams}`; // Google Pay
  const phonepeString = `phonepe://pay${queryParams}`; // PhonePe
  const paytmString = `paytmmp://pay${queryParams}`; // Paytm

  return (
    <div className="w-full flex flex-col items-center relative min-h-screen bg-[#0b0f19] pt-20 pb-24">
      
      <div className="fixed top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-30 mix-blend-screen w-[600px] h-[600px] lg:w-[1200px] lg:h-[1200px]">
        <img src="/contact.webp" alt="Cosmic Background" className="w-full h-full object-contain animate-[spin_40s_linear_infinite]" />
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
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
                disabled={modal.requireTimer && timeLeft > 0}
                className={`px-5 py-2 rounded-md font-bold text-sm transition text-black ${(modal.requireTimer && timeLeft > 0) ? 'bg-slate-600 cursor-not-allowed opacity-50 text-slate-300' : modal.type === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#d9901c] hover:bg-[#c48218]'}`}
              >
                {modal.requireTimer && timeLeft > 0 ? `Please read... (${timeLeft}s)` : modal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto px-4 relative z-10">
        <div className="bg-[#0b0f19]/90 backdrop-blur-md lg:bg-[#111827]/90 lg:border border-slate-800 p-6 lg:p-10 rounded-2xl shadow-xl">
          
          {step === 1 && (
            <form onSubmit={handleProceedClick} className="space-y-5">
              <div className="text-center mb-8">
                 <h3 className="text-3xl font-serif text-white mb-2">Book a Consultation</h3>
                 <p className="text-slate-400 text-sm">Fill in your details to generate your secure payment code.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Eg. Ramesh Kumar" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

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
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c] block min-h-[50px] [color-scheme:dark]" 
                  />
                  {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Time of Birth</label>
                  <input 
                    type="time" 
                    name="tob" 
                    value={formData.tob} 
                    onChange={handleChange} 
                    className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-slate-300 focus:outline-none focus:border-[#d9901c] block min-h-[50px] [color-scheme:dark]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Place of Birth *</label>
                <input type="text" name="pob" value={formData.pob} onChange={handleChange} placeholder="Eg. Hyderabad, Telangana" className="w-full bg-[#0b0f19] border border-slate-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-[#d9901c]" />
                {errors.pob && <p className="text-red-400 text-xs mt-1">{errors.pob}</p>}
              </div>

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

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider">Your Message / Question</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us briefly what you'd like guidance on..." className="w-full bg-[#0b0f19] border border-slate-700 rounded-md p-4 text-white focus:outline-none focus:border-[#d9901c] resize-none"></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#d9901c] text-black font-bold py-4 rounded-md hover:bg-[#c48218] transition disabled:opacity-70 flex justify-center items-center gap-2">
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 flex flex-col items-center animate-fade-in py-4">
              <div className="w-full bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-lg text-center mb-2">
                <p className="text-yellow-500 font-bold text-sm uppercase tracking-wider">Step 2: Complete Payment</p>
              </div>

              <div className="text-center w-full">
                <p className="text-slate-400 text-sm mb-1">Paying to:</p>
                <p className="text-white font-mono text-lg font-bold tracking-wide bg-[#0b0f19] py-2 px-4 rounded border border-slate-700 inline-block">
                  {upiId}
                </p>
                <p className="text-[#d9901c] font-bold text-2xl mt-4">Amount: ₹{paymentAmount}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-xl shadow-black/50 mx-auto">
                <QRCodeCanvas value={upiString} size={220} level={"H"} />
              </div>

              {/* NEW: APP CHOOSER GRID */}
              <div className="w-full max-w-xs mx-auto space-y-3 pt-2">
                <p className="text-center text-slate-400 text-xs uppercase tracking-wider">Or open directly in:</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href={gpayString} className="bg-[#0b0f19] border border-slate-700 text-white font-bold py-2.5 px-2 rounded-md hover:border-[#d9901c] transition flex items-center justify-center text-sm shadow-md">
                    Google Pay
                  </a>
                  <a href={phonepeString} className="bg-[#0b0f19] border border-slate-700 text-white font-bold py-2.5 px-2 rounded-md hover:border-[#d9901c] transition flex items-center justify-center text-sm shadow-md">
                    PhonePe
                  </a>
                  <a href={paytmString} className="bg-[#0b0f19] border border-slate-700 text-white font-bold py-2.5 px-2 rounded-md hover:border-[#d9901c] transition flex items-center justify-center text-sm shadow-md">
                    Paytm
                  </a>
                  <a href={upiString} className="bg-slate-800 border border-slate-600 text-white font-bold py-2.5 px-2 rounded-md hover:bg-slate-700 transition flex items-center justify-center text-sm shadow-md">
                    Other App
                  </a>
                </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-slate-800">
                <label className="block text-sm font-bold text-white mb-2 text-center">
                  Fill Your Transaction ID Below
                </label>
                <p className="text-xs text-slate-400 text-center mb-4 leading-relaxed">
                  Once you have paid via QR or the buttons above, <span className="text-[#d9901c]">you MUST enter the 12-digit UTR/Reference No.</span> here to confirm your booking.
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
    </div>
  );
}