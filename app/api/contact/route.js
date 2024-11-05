import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received body:', body); // For debugging

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    let emailContent;
    let subject;

    // Check if it's an appointment submission
    if (body.type === 'appointment') {
      emailContent = `
        <h2>Yeni Randevu Talebi</h2>
        <p><strong>Ad Soyad:</strong> ${body.adinizSoyadiniz || ''}</p>
        <p><strong>E-posta:</strong> ${body.email || ''}</p>
        <p><strong>Telefon:</strong> ${body.telefon || ''}</p>
        <p><strong>Görüşme Tipi:</strong> ${body.gorusmeTipi || ''}</p>
        <p><strong>Seçilen Tarih:</strong> ${new Date(body.selectedDate).toLocaleDateString('tr-TR')}</p>
        <p><strong>Seçilen Saat:</strong> ${body.selectedTime}</p>
      `;
      subject = `Yeni Randevu Talebi - ${body.adinizSoyadiniz || 'Yeni Randevu'}`;
    } else {
      // Regular contact form
      emailContent = `
        <h2>Yeni İletişim Mesajı</h2>
        <p><strong>Ad:</strong> ${body.adiniz || ''}</p>
        <p><strong>E-posta:</strong> ${body.email || ''}</p>
        <p><strong>Mesaj:</strong> ${body.mesajiniz || ''}</p>
      `;
      subject = `Yeni İletişim Mesajı - ${body.adiniz || 'Yeni Mesaj'}`;
    }

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: subject,
      html: emailContent
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email başarıyla gönderildi' 
    });

  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Email gönderilirken bir hata oluştu' 
      }, 
      { status: 500 }
    );
  }
}