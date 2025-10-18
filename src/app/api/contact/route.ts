import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const zip = formData.get('zip') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;
    const contactMethod = formData.get('contactMethod') as string;
    const contactTime = formData.get('contactTime') as string;
    const files = formData.getAll('files') as File[];

    // Convert files to attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Email to business (with attachments)
    await resend.emails.send({
      from: 'PT Roofing <quotes@mail.ptroofingandrenovations.com>',
      to: ['ptroofingandrenovations.info@gmail.com'],
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ccb78a;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Address:</strong> ${address}, ${city}, ${zip}</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Project Details</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Preferred Contact Method:</strong> ${contactMethod}</p>
            <p><strong>Preferred Contact Time:</strong> ${contactTime}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          ${files.length > 0 ? `
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📎 Attachments:</strong> ${files.length} file(s) attached</p>
            </div>
          ` : ''}
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Confirmation email to customer (no attachments)
    await resend.emails.send({
      from: 'PT Roofing <quotes@mail.ptroofingandrenovations.com>',
      to: [email],
      subject: 'Thank You for Your Quote Request - PT Roofing & Renovations',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ccb78a; margin: 0;">PT Roofing & Renovations</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Quality Craftsmanship You Can Trust</p>
          </div>

          <!-- Main Content -->
          <div style="background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Thank You, ${name}!</h2>
            <p style="color: #666; line-height: 1.6;">
              We've received your quote request and will get back to you within 24 hours. One of our team members will contact you via <strong>${contactMethod}</strong> during your preferred time: <strong>${contactTime}</strong>.
            </p>
          </div>

          <!-- Request Summary -->
          <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Your Request Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Service:</td>
                <td style="padding: 10px 0; color: #333;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Address:</td>
                <td style="padding: 10px 0; color: #333;">${address}, ${city}, ${zip}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; color: #333;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Message:</td>
                <td style="padding: 10px 0; color: #333;">${message}</td>
              </tr>
            </table>
          </div>

          <!-- Contact Info -->
          <div style="background: #ccb78a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: white;">Need to Reach Us?</h3>
            <p style="margin: 5px 0;">📞 Phone: (512) 999-4366</p>
            <p style="margin: 5px 0;">📧 Email: ptroofingandrenovations.info@gmail.com</p>
            <p style="margin: 5px 0;">📍 Austin - San Marcos Area</p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; color: #999; font-size: 14px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
            <p style="margin: 10px 0;">© ${new Date().getFullYear()} PT Roofing & Renovations LLC. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}