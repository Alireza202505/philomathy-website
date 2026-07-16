import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, preferredDate, message } = req.body;

    const emailBody = `
New Booking Request

Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Subject/Course: ${subject || 'N/A'}
Preferred Date: ${preferredDate || 'N/A'}
Message: ${message || 'N/A'}

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Philomathy Bookings" <${process.env.GMAIL_USER}>`,
      to: 'philomathy.info@gmail.com',
      subject: `New Booking Request — ${name || 'Unknown'}`,
      text: emailBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('notify-booking error:', err);
    return res.status(200).json({ warning: 'Booking saved, email failed' });
  }
}
