'use server';

import nodemailer from 'nodemailer';

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const resumeId = formData.get('resumeId') as string;
    const mobileNumber = formData.get('mobileNumber') as string;
    const emailAddress = formData.get('emailAddress') as string;
    const regarding = formData.get('regarding') as string;
    const message = formData.get('message') as string;
    const file = formData.get('resumeFile') as File | null;

    if (!fullName || !emailAddress || !message) {
      return { success: false, message: 'Please drop your complete name, email, and message.' };
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.local');
      return { 
        success: false, 
        message: 'Server configuration error. Missing email credentials.' 
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER, 
        pass: GMAIL_APP_PASSWORD,
      },
    });

    let attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    const mailOptions = {
      from: `"${fullName} (Website)" <${GMAIL_USER}>`, 
      to: 'directwayscareer@gmail.com', 
      replyTo: emailAddress,
      subject: `New Submission: ${regarding} from ${fullName}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #e62e2e; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${emailAddress}">${emailAddress}</a></p>
          <p><strong>Mobile Number:</strong> ${mobileNumber || 'N/A'}</p>
          <p><strong>Resume ID:</strong> ${resumeId || 'N/A'}</p>
          <p><strong>Regarding:</strong> ${regarding}</p>
          
          <h3 style="margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px;">${message}</p>
        </div>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Success! Your information has been sent.' };

  } catch (error) {
    console.error('Error dispatching mail:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
}
