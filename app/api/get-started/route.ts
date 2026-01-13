import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in environment variables');
      return NextResponse.json(
        { error: 'Email service configuration error. Please ensure RESEND_API_KEY is set in your deployment environment variables.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { first_name, last_name, business_name, phone_country_code, phone_number, email, website, services, other_info } = body;

    // Validate required fields
    if (!first_name || !last_name || !business_name || !phone_number || !email || !services || services.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fullName = `${first_name} ${last_name}`.trim();
    const phoneFull = phone_number ? `${phone_country_code} ${phone_number}` : '';
    const servicesList = Array.isArray(services) ? services.join(', ') : services;
    const subject = `Get Started Request from ${business_name} - ${fullName}`;

    // Format the email body
    const emailBody = `
Business Name: ${business_name}
Name: ${fullName}
Email: ${email}
Phone: ${phoneFull}
${website ? `Website: ${website}` : ''}

Services of Interest: ${servicesList}

${other_info ? `Additional Information:\n${other_info}` : ''}
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'design@elemta.com',
      to: 'design@elemta.com',
      replyTo: email,
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            New Get Started Request
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Business Name:</strong> ${business_name}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneFull}</p>
            ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ''}
            <p><strong>Services of Interest:</strong> ${servicesList}</p>
          </div>
          ${other_info ? `
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Additional Information:</h3>
            <p style="color: #666; white-space: pre-wrap;">${other_info}</p>
          </div>
          ` : ''}
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
    console.error('Get started form error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
