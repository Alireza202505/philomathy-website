import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    const emailBody = `
New Contact Form Submission

Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Subject: ${subject || 'N/A'}
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
      from: `"Philomathy Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'philomathy.info@gmail.com',
      replyTo: email,
      subject: `New Contact Message — ${subject || 'No subject'}`,
      text: emailBody,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('notify-contact error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
