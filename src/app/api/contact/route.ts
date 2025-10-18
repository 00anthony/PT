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

    // Convert files to base64 attachments
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

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'PT Roofing <quotes@mail.ptroofingandrenovations.com>', // Replace with your verified domain
      to: ['anthonytij3@gmail.com'], // Your business email
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${zip}</p>
        <p><strong>Contact Method:</strong> ${contactMethod}</p>
        <p><strong>Contact Time:</strong> ${contactTime}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${files.length > 0 ? `<p><strong>Attachments:</strong> ${files.length} file(s) attached</p>` : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}