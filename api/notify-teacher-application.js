import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      subjects,
      experience,
      education,
      message,
      resume, // { filename, contentType, data (base64) }
    } = req.body;

    const emailBody = `
New Teacher Application

Name: ${name || 'N/A'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
Subjects: ${subjects || 'N/A'}
Years of Experience: ${experience || 'N/A'}
Education / Qualifications: ${education || 'N/A'}

Message:
${message || 'N/A'}

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const attachments = [];
    if (resume && resume.data) {
      attachments.push({
        filename: resume.filename || 'resume',
        content: Buffer.from(resume.data, 'base64'),
        contentType: resume.contentType || 'application/octet-stream',
      });
    }

    await transporter.sendMail({
      from: `"Philomathy Teacher Applications" <${process.env.GMAIL_USER}>`,
      to: 'philomathy.info@gmail.com',
      replyTo: email,
      subject: `New Teacher Application — ${name || 'Unknown'}`,
      text: emailBody,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('notify-teacher-application error:', err);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
}
