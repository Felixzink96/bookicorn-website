import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, studioName, subject, message } = body

    // Validierung
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Bitte alle Pflichtfelder ausfüllen' },
        { status: 400 }
      )
    }

    // SMTP Transporter (All-Inkl)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Betreff-Mapping
    const subjectMap: Record<string, string> = {
      general: 'Allgemeine Anfrage',
      demo: 'Demo anfordern',
      enterprise: 'Enterprise Anfrage',
      partnership: 'Partnerschaft',
      support: 'Technischer Support',
      feedback: 'Feedback',
    }

    const subjectText = subjectMap[subject] || subject

    // Email an uns
    await transporter.sendMail({
      from: `"Bookicorn Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Kontakt] ${subjectText} - ${firstName} ${lastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${studioName ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Studio:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${studioName}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Betreff:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${subjectText}</td>
          </tr>
        </table>
        <h3 style="margin-top: 20px;">Nachricht:</h3>
        <div style="padding: 15px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${message}</div>
      `,
    })

    // Bestätigungs-Email an Absender
    await transporter.sendMail({
      from: `"Bookicorn" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Wir haben deine Nachricht erhalten`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Vielen Dank für deine Nachricht!</h2>
          <p>Hallo ${firstName},</p>
          <p>wir haben deine Anfrage erhalten und melden uns schnellstmöglich bei dir.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Deine Nachricht:</strong><br>
            <em>${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</em>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            Bookicorn - Die moderne Kursplattform<br>
            <a href="https://bookicorn.net" style="color: #22c55e;">bookicorn.net</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden. Bitte versuche es später erneut.' },
      { status: 500 }
    )
  }
}
