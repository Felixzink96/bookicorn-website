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
        pass: process.env.EMAIL_PASSWORD,
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
      from: `"Bookicorn Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'felix.zink@unicorn-factory.net',
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
      from: `"Bookicorn" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: `Wir haben deine Nachricht erhalten`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header mit Gradient -->
            <div style="background: linear-gradient(135deg, #EE4035 0%, #2D61F0 50%, #A6D30F 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Bookicorn</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Die moderne Kursplattform</p>
            </div>

            <!-- Content -->
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px;">
              <h2 style="color: #18181b; margin: 0 0 20px 0; font-size: 24px;">Hey ${firstName}!</h2>

              <p style="color: #3f3f46; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Vielen Dank für deine Nachricht! Wir haben sie erhalten und melden uns so schnell wie möglich bei dir.
              </p>

              <p style="color: #3f3f46; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                In der Regel antworten wir innerhalb von 24 Stunden.
              </p>

              <!-- Nachricht Box -->
              <div style="background: #f4f4f5; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <p style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">Deine Nachricht</p>
                <p style="color: #3f3f46; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                  "${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"
                </p>
              </div>

              <!-- CTA -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://bookicorn.net" style="display: inline-block; background: linear-gradient(135deg, #EE4035 0%, #2D61F0 50%, #A6D30F 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 14px;">
                  Mehr über Bookicorn erfahren
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 30px 20px;">
              <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} Bookicorn. Alle Rechte vorbehalten.
              </p>
              <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                <a href="https://bookicorn.net" style="color: #2D61F0; text-decoration: none;">bookicorn.net</a>
              </p>
            </div>
          </div>
        </body>
        </html>
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
