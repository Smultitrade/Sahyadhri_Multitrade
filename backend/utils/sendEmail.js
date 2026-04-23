const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ======= CAREER EMAIL =======
const sendCareerEmail = async ({ name, email, phone, position, message, resume }) => {
    const mailOptions = {
        from: `"Sahyadhri Website" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        replyTo: email,
        subject: `New Job Application — ${position || 'General'} | Sahyadhri Multitrade`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background: #0d2137; padding: 24px 32px;">
                    <h2 style="color: #f5a623; margin: 0; font-size: 20px;">New Job Application Received</h2>
                    <p style="color: #ffffff; margin: 6px 0 0; font-size: 13px;">Sahyadhri Multitrade Pvt. Ltd. — Career Form</p>
                </div>
                <div style="padding: 28px 32px; background: #ffffff;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #666; font-size: 13px; width: 140px;">Name</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${name}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Email</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${email}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Phone</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${phone}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Position</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${position || 'Not specified'}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top;">About</td>
                            <td style="padding: 10px 0; color: #1a1a1a;">${message || 'Not provided'}</td>
                        </tr>
                    </table>
                    <p style="margin: 20px 0 6px; color: #666; font-size: 13px;">📎 Resume is attached to this email.</p>
                </div>
                <div style="background: #f9f9f9; padding: 16px 32px; text-align: center;">
                    <p style="margin: 0; color: #aaa; font-size: 12px;">Sent from Sahyadhri Multitrade website career form.</p>
                </div>
            </div>
        `,
        attachments: resume ? [{
            filename: resume.originalname,
            content: resume.buffer,
            contentType: resume.mimetype
        }] : []
    };

    await transporter.sendMail(mailOptions);
};

// ======= CONTACT EMAIL =======
const sendContactEmail = async ({ name, phone, email, subject, message }) => {
    const mailOptions = {
        from: `"Sahyadhri Website" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        replyTo: email,
        subject: `New Enquiry — ${subject || 'General'} | Sahyadhri Multitrade`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background: #0d2137; padding: 24px 32px;">
                    <h2 style="color: #f5a623; margin: 0; font-size: 20px;">New Contact Enquiry</h2>
                    <p style="color: #ffffff; margin: 6px 0 0; font-size: 13px;">Sahyadhri Multitrade Pvt. Ltd. — Contact Form</p>
                </div>
                <div style="padding: 28px 32px; background: #ffffff;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #666; font-size: 13px; width: 140px;">Name</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${name}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Phone</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${phone}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Email</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${email}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px;">Subject</td>
                            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${subject || 'Not specified'}</td>
                        </tr>
                        <tr style="border-top: 1px solid #f0f0f0;">
                            <td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top;">Message</td>
                            <td style="padding: 10px 0; color: #1a1a1a;">${message || 'Not provided'}</td>
                        </tr>
                    </table>
                </div>
                <div style="background: #f9f9f9; padding: 16px 32px; text-align: center;">
                    <p style="margin: 0; color: #aaa; font-size: 12px;">Sent from Sahyadhri Multitrade website contact form.</p>
                </div>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendCareerEmail, sendContactEmail };