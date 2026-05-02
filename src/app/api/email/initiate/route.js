import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const formData = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Keep this if using Resend Sandbox
      to: process.env.ADMIN_EMAIL,
      subject: `🚨 Payment Initiated: ${formData.name}`,
      html: `
        <h2>Payment Under Process</h2>
        <p>A user has filled the form and is currently looking at the QR code.</p>
        <h3>Client Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Service:</strong> ${formData.service}</li>
          <li><strong>DOB:</strong> ${formData.dob} | <strong>TOB:</strong> ${formData.tob}</li>
          <li><strong>Place:</strong> ${formData.pob}</li>
        </ul>
        <p><em>Message: ${formData.message || 'None'}</em></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send alert" }, { status: 500 });
  }
}