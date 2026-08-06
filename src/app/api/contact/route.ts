import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Tüm form gönderimlerinin düştüğü adres. Vercel'de CONTACT_TO_EMAIL
// tanımlanırsa kod değiştirmeden buradan yönlendirilebilir.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'alim.demirli@abdkurumlari.com';

// Office365 587 (STARTTLS) ile çalışır; 465 ise baştan TLS ister.
// secure değerini porta göre seçiyoruz, yoksa 587'de el sıkışma başarısız oluyor.
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER ?? TO_EMAIL;

// Office365 yalnızca kimlik doğrulanan kutu adına gönderime izin verir;
// bu yüzden gönderen adresi SMTP kullanıcısıyla aynı olmalı.
const FROM_EMAIL = SMTP_USER;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.office365.com',
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  requireTLS: SMTP_PORT !== 465,
  auth: {
    user: SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Gönderim yolu ───────────────────────────────────────────────────────────
// RESEND_API_KEY tanımlıysa Resend üzerinden gönderilir (SMTP'ye hiç
// dokunulmaz; Office365'in SMTP politikasına bağımlılık ortadan kalkar).
// Tanımlı değilse klasik SMTP yolu kullanılır. Böylece hangi yöntem
// kullanılabilir hale gelirse, kod değişmeden sadece env ile seçilir.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_ENDPOINT = process.env.RESEND_API_URL ?? 'https://api.resend.com/emails';
const RESEND_FROM = process.env.RESEND_FROM ?? FROM_EMAIL;
const FROM_NAME = 'Şirinevler Final Dershanesi';

async function deliver(subject: string, html: string, replyTo?: string) {
  if (RESEND_API_KEY) {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${RESEND_FROM}>`,
        to: [TO_EMAIL],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend ${res.status}: ${await res.text()}`);
    }
    return;
  }

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo,
    subject,
    html,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    let subject = '';
    let html = '';

    if (type === 'analysis') {
      subject = `🔬 Yeni Analiz Talebi — ${data.path === 'existing' ? 'Markam Var' : 'Marka Kurmak İstiyorum'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05010d; color: #f2f2f2; padding: 32px; border-radius: 16px; border: 1px solid #2d1b66;">
          <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 24px;">🔬 Yeni Analiz Talebi</h1>
          <p style="color: #a3a3a3; margin-bottom: 24px;"><strong style="color: #f2f2f2;">Yol:</strong> ${data.path === 'existing' ? 'Markam Var' : 'Marka Kurmak İstiyorum'}</p>
          
          ${data.path === 'existing' ? `
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Mevcut Marka Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Web Sitesi</td><td style="padding: 8px 0; color: #f2f2f2;">${data.website || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Instagram</td><td style="padding: 8px 0; color: #f2f2f2;">${data.instagram || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">LinkedIn</td><td style="padding: 8px 0; color: #f2f2f2;">${data.linkedin || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${data.name || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${data.email || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${data.phone || '—'}</td></tr>
          </table>
          ` : `
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Yeni Marka Bilgileri</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 140px;">Sektör</td><td style="padding: 8px 0; color: #f2f2f2;">${data.sector || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Proje Detayı</td><td style="padding: 8px 0; color: #f2f2f2;">${data.projectDetail || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">İstenen Hizmetler</td><td style="padding: 8px 0; color: #f2f2f2;">${(data.services || []).join(', ') || '—'}</td></tr>
          </table>
          `}
          
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Talep / Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6;">${data.request || '—'}</p>
          
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Şirinevler Final Dershanesi — Ön Görüşme Sistemi</p>
        </div>
      `;
    } else {
      // LetsWork / general contact
      subject = data.subject
        ? `💼 ${data.subject} — ${data.name || 'İsimsiz'}`
        : `💼 Yeni İletişim Mesajı — ${data.name || 'İsimsiz'}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #05010d; color: #f2f2f2; padding: 32px; border-radius: 16px; border: 1px solid #2d1b66;">
          <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 24px;">💼 Yeni İletişim Mesajı</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a3a3a3; width: 120px;">Ad Soyad</td><td style="padding: 8px 0; color: #f2f2f2;">${data.name || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">E-posta</td><td style="padding: 8px 0; color: #f2f2f2;">${data.email || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #a3a3a3;">Telefon</td><td style="padding: 8px 0; color: #f2f2f2;">${data.phone || '—'}</td></tr>
            ${data.subject ? `<tr><td style="padding: 8px 0; color: #a3a3a3;">Konu</td><td style="padding: 8px 0; color: #f2f2f2;">${data.subject}</td></tr>` : ''}
          </table>
          <h2 style="color: #8b5cf6; font-size: 16px; margin-top: 24px;">Mesaj</h2>
          <p style="background: #1e1033; padding: 16px; border-radius: 8px; color: #f2f2f2; border-left: 3px solid #8b5cf6;">${data.message || '—'}</p>
          <hr style="border: none; border-top: 1px solid #2d1b66; margin: 32px 0;" />
          <p style="color: #4a4a4a; font-size: 12px;">Şirinevler Final Dershanesi — İletişim Sistemi</p>
        </div>
      `;
    }

    // Maili a\u00e7an ki\u015fi do\u011frudan formu dolduran ki\u015fiye cevap verebilsin.
    const replyTo =
      typeof data.email === 'string' && data.email.includes('@') ? data.email : undefined;

    await deliver(subject, html, replyTo);

    console.log('[Contact API] Email sent:', subject, data);

    return NextResponse.json({ success: true });
  } catch (err) {
    // Ayrıntı sunucu loglarında kalsın (Vercel → Logs); ziyaretçiye SMTP
    // sunucu/hesap bilgisi sızdıran ham hata mesajı dönmemeli.
    console.error('[Contact API] Error:', err);
    return NextResponse.json(
      { success: false, error: 'E-posta gönderilemedi.' },
      { status: 500 }
    );
  }
}
