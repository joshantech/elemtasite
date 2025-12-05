import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { first_name, last_name, company_name, from_email, phone_country_code, phone_number, message } = body;

    // Validate required fields
    if (!first_name || !last_name || !from_email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fullName = `${first_name} ${last_name}`.trim();
    const phoneFull = phone_number ? `${phone_country_code} ${phone_number}` : '';
    const subject = company_name 
      ? `Contact from ${company_name} - ${fullName}`
      : `Contact from ${fullName}`;

    // Format the email body
    const emailBody = `
Company: ${company_name || 'N/A'}
Phone: ${phoneFull || 'N/A'}
Email: ${from_email}

Message:
${message}
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'design@elemta.com',
      to: 'design@elemta.com',
      replyTo: from_email,
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${from_email}</p>
            ${company_name ? `<p><strong>Company:</strong> ${company_name}</p>` : ''}
            ${phoneFull ? `<p><strong>Phone:</strong> ${phoneFull}</p>` : ''}
          </div>
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


