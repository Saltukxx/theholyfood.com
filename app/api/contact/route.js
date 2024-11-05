import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Log for debugging
    console.log('Received form data:', body);
    console.log('Environment variables:', {
      user: process.env.GMAIL_USER,
      hasPassword: !!process.env.GMAIL_APP_PASSWORD
    });

    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Missing email configuration');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Test the connection
    await transporter.verify();

    const emailContent = `
      <h2>Yeni İletişim Mesajı</h2>
      <p><strong>Ad:</strong> ${body.adiniz}</p>
      <p><strong>E-posta:</strong> ${body.email}</p>
      <p><strong>Mesaj:</strong> ${body.mesajiniz}</p>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Yeni İletişim Mesajı - ${body.adiniz}`,
      html: emailContent
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    return NextResponse.json({ 
      success: true, 
      message: 'Email başarıyla gönderildi' 
    });

  } catch (error) {
    console.error('Detailed error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Email gönderilirken bir hata oluştu: ' + error.message
      }, 
      { status: 500 }
    );
  }
}