import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const formData = await req.json();

    // 1. Send Email Alert
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL,
      subject: `👋 New Free Consultation Request: ${formData.name}`,
      html: `
        <h2>Free Consultation Lead</h2>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>DOB:</strong> ${formData.dob}</li>
        </ul>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    });

    // 2. Backup to Google Sheets
    const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      // Explicitly tell Google we are sending JSON
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        sheetName: 'Free Consultations',
        type: 'FREE_CONSULTATION', 
        data: formData 
      }),
    });

    // 3. Capture and log Google's response
    const sheetResult = await sheetResponse.text();
    console.log("Google Sheets Status Code:", sheetResponse.status);
    console.log("Google Sheets Response:", sheetResult);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Total Route Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}