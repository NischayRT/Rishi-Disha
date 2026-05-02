import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const servicePrices = {
  "Astrology & Vastu Consultations": 1500,
  "Remedies & Homas": 2000,
  "Devata Prathista": 5000,
  "Gems, Crystals, & Rudraksha": 800,
  "Marriage Compatibility (Kundali Milan)": 1200,
  "Career & Finance Astrology": 1500,
};

export async function POST(req) {
  try {
    const formData = await req.json();
    const priceAmount = servicePrices[formData.service] || 1500;

    const options = {
      amount: priceAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: formData.name,
        customerPhone: formData.phone,
        service: formData.service,
      }
    };

    // Create the order on Razorpay servers
    const order = await razorpay.orders.create(options);

    // Return the order ID to the frontend
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}