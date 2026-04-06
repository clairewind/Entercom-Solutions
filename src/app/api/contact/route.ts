import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Get environment variables
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "clairerebecca2004@gmail.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://entercomsolutions.com";
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Entercom Solutions";

    // Create admin notification email content (for mailto)
    const adminSubject = encodeURIComponent(`New Contact Form Submission from ${name}`);
    const adminBody = encodeURIComponent(
      `You have received a new contact form submission with the following details:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || 'Not provided'}\n` +
      `Message: ${message}\n\n` +
      `Please respond to this inquiry as soon as possible.\n\n` +
      `Quick Reply: mailto:${email}?subject=Re: Your inquiry to ${siteName}&body=Dear ${name},\n\nThank you for contacting ${siteName}.\n\n`
    );

    // Send user confirmation email via Resend (automatic)
    const userSubject = `Thank you for contacting ${siteName}`;
    const userHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #0D9488 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Thank You!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #0D9488; margin-top: 0;">Dear ${name},</h2>
          <p style="line-height: 1.6;">Thank you for reaching out to ${siteName}. We have successfully received your message and truly appreciate your interest in our services.</p>
          
          <p style="line-height: 1.6;">Our team is currently reviewing your inquiry and will get back to you within 24 hours with a comprehensive response to your project needs.</p>
          
          <p style="line-height: 1.6;">In the meantime, feel free to explore our website to learn more about our services and past projects.</p>
          
          <p style="line-height: 1.6;">We look forward to the opportunity to work with you and help bring your digital vision to life.</p>
        </div>
        
        <div style="text-align: center; padding: 20px;">
          <a href="${siteUrl}" style="background: #0D9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Visit Our Website
          </a>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center;">
          <h3 style="color: #0D9488; margin-top: 0;">Best regards,</h3>
          <p style="margin: 5px 0; font-weight: bold;">The ${siteName} Team</p>
          <p style="margin: 5px 0; color: #64748b;">${siteUrl}</p>
        </div>
      </div>
    `;

    // Send admin notification email via Resend
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #0D9488 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new inquiry from ${name}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #0D9488; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Submitted:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #0D9488; margin-top: 0;">Message</h2>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="text-align: center; padding: 20px;">
          <a href="mailto:${email}?subject=Re: Your inquiry to ${siteName}&body=Dear ${name},%0D%0A%0D%0AThank you for contacting ${siteName}.%0D%0A%0D%0A" style="background: #0D9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reply to ${name}
          </a>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 12px; margin-top: 30px;">
          <p>This email was sent from the ${siteName} contact form</p>
          <p>${siteUrl}</p>
        </div>
      </div>
    `;

    // Send admin notification via Resend
    const adminEmailResult = await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: adminEmail,
      subject: adminSubject,
      html: adminEmailHtml,
    });

    // Send user confirmation via Resend
    const userEmailResult = await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: email, // Send to actual user's email
      subject: `Thank you for contacting ${siteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: linear-gradient(135deg, #0D9488 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank You!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #0D9488; margin-top: 0;">Dear ${name},</h2>
            <p style="line-height: 1.6;">Thank you for reaching out to ${siteName}. We have successfully received your message and truly appreciate your interest in our services.</p>
            
            <p style="line-height: 1.6;">Our team is currently reviewing your inquiry and will get back to you within 24 hours with a comprehensive response to your project needs.</p>
            
            <p style="line-height: 1.6;">In the meantime, feel free to explore our website to learn more about our services and past projects.</p>
            
            <p style="line-height: 1.6;">We look forward to the opportunity to work with you and help bring your digital vision to life.</p>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <a href="${siteUrl}" style="background: #0D9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center;">
            <h3 style="color: #0D9488; margin-top: 0;">Best regards,</h3>
            <p style="margin: 5px 0; font-weight: bold;">The ${siteName} Team</p>
            <p style="margin: 5px 0; color: #64748b;">${siteUrl}</p>
          </div>
        </div>
      `,
    });

    console.log('Admin email sent via Resend:', adminEmailResult);
    console.log('User confirmation sent via Resend:', userEmailResult);

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully! Both admin and user emails sent automatically.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
