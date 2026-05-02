import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // 1. Verify that the request is actually from Razorpay
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET) // Get this from Razorpay Dashboard
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error("Invalid signature!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // 2. Handle the successful payment event
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      
      // Extract the data we passed in the 'notes' object when creating the order
      const paymentEntity = event.payload.payment.entity;
      const notes = paymentEntity.notes;

      // Extract client details
      const clientName = notes.customerName;
      const clientEmail = notes.customerEmail; // Make sure your frontend sends this!
      const clientService = notes.service;
      const clientPhone = notes.customerPhone;

      console.log(`Payment confirmed for ${clientName} (${clientService})`);

      // 3. Send the Confirmation Email to the USER via Resend
      if (clientEmail) {
        await resend.emails.send({
          from: 'bookings@rishidisha.com', // Must be your verified domain in Resend
          to: 'nischayreddy.t@gmail.com',
          subject: 'Booking Confirmed - Sree Raajarajeswari Jyotisyalayam',
          html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0b0f19; padding: 30px; text-align: center;">
                <h1 style="color: #d9901c; margin: 0; font-size: 24px;">Booking Confirmed!</h1>
              </div>
              
              <div style="padding: 30px;">
                <p>Hari Om, <strong>${clientName}</strong>,</p>
                <p>We have successfully received your payment. Thank you for booking a consultation with Garimella VV Satyanarayana Sharma.</p>
                
                <h3 style="color: #0b0f19; border-bottom: 2px solid #d9901c; padding-bottom: 5px;">Your Booking Details:</h3>
                <ul style="list-style: none; padding: 0;">
                  <li style="margin-bottom: 10px;"><strong>Service:</strong> ${clientService}</li>
                  <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${clientPhone}</li>
                  <li style="margin-bottom: 10px;"><strong>Payment ID:</strong> ${paymentEntity.id}</li>
                </ul>

                <p style="margin-top: 30px;">Our team will review your details and contact you via WhatsApp shortly to schedule the exact time of your consultation.</p>
                
                <p style="color: #777; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; pt-4;">
                  Sree Raajarajeswari Jyotisyalayam<br>
                  Hyderabad, India
                </p>
              </div>
            </div>
          `,
        });
        
        console.log("Confirmation email sent to user!");
      }

      // Optional: Send an admin alert to yourself here via Telegram!
    }

    // Always respond with 200 OK so Razorpay knows you received the webhook
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}