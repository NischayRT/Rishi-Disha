import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { formData, utr } = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Keep this if using Resend Sandbox
      to: process.env.ADMIN_EMAIL,
      subject: `✅ Transaction Confirmation: ${formData.name}`,
      html: `
        <h2 style="color: green;">Transaction Submitted!</h2>
        <p>The user has submitted a UTR number for verification.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; margin: 20px 0; border-left: 4px solid #d9901c;">
          <h3 style="margin-top: 0;">Submitted UTR / Transaction ID:</h3>
          <h1 style="letter-spacing: 2px;">${utr}</h1>
        </div>

        <h3>Client Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Service:</strong> ${formData.service}</li>
        </ul>
        <p><em>Please check your bank app to verify this UTR matches a received payment before proceeding with the consultation.</em></p>
      `,
    });
    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ 
        sheetName: 'Confirmed Bookings', // <--- Tab name
        type: 'PAYMENT_CONFIRMATION', 
        data: { ...formData, utr: utr } 
      }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send alert" }, { status: 500 });
  }
}