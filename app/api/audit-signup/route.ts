import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { google } from 'googleapis'

const resend = new Resend(process.env.RESEND_API_KEY)
const SPREADSHEET_ID = '1l_47YKmpTBL0hU8LzLCJCLmkCmF6z72QgDetJiyomLA'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function appendToSheet(email: string): Promise<void> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const date = new Date().toLocaleDateString('en-IE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[email, date, 'Website - AI Audit', 'Lead']],
    },
  })
}

function confirmationEmailHtml(): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07070c;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#07070c;padding:48px 32px;">

    <div style="margin-bottom:36px;">
      <span style="display:inline-block;background:#3FB700;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:6px 14px;border-radius:20px;">PRice AI Marketing</span>
    </div>

    <h1 style="font-size:26px;font-weight:700;color:#ffffff;margin:0 0 20px;line-height:1.3;">Your Free AI Marketing Audit — Next Steps</h1>

    <p style="color:#9ca3af;font-size:16px;line-height:1.75;margin:0 0 20px;">You just signed up for a free AI marketing audit. Good move.</p>

    <p style="color:#9ca3af;font-size:16px;line-height:1.75;margin:0 0 24px;">To get you the most useful audit possible, reply to this email with:</p>

    <div style="background:#0f0f1f;border-left:3px solid #3FB700;border-radius:0 10px 10px 0;padding:24px 28px;margin:0 0 28px;">
      <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0 0 14px;">1. Your website URL</p>
      <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0 0 14px;">2. Your social media handles<br><span style="color:#6b7280;font-weight:400;font-size:14px;">(LinkedIn, Instagram, TikTok — wherever you're active)</span></p>
      <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0;">3. What you're struggling with most in your marketing right now</p>
    </div>

    <p style="color:#9ca3af;font-size:16px;line-height:1.75;margin:0 0 20px;">I'll personally review everything and get back to you within <strong style="color:#ffffff;">48 hours</strong> with a direct breakdown of where you're leaving money on the table — and exactly how AI can fix it.</p>

    <p style="color:#9ca3af;font-size:16px;line-height:1.75;margin:0 0 40px;">No fluff. No sales pitch. Just a clear, actionable audit.</p>

    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:28px;">
      <p style="color:#ffffff;font-size:15px;font-weight:700;margin:0 0 4px;">Padraig Rice</p>
      <p style="color:#6b7280;font-size:14px;margin:0 0 8px;">Founder, PRice AI Marketing</p>
      <a href="https://priceaimarketing.ie" style="color:#3FB700;font-size:14px;text-decoration:none;">priceaimarketing.ie</a>
    </div>

  </div>
</body>
</html>
  `.trim()
}

function notificationEmailHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#111;">
  <h2 style="margin:0 0 20px;">New AI Audit Request</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:100px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;">${email}</td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;">Date</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${new Date().toLocaleDateString('en-IE')}</td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;">Source</td><td style="padding:10px 0;border-bottom:1px solid #eee;">Website - AI Audit</td></tr>
    <tr><td style="padding:10px 0;color:#666;">Status</td><td style="padding:10px 0;color:#3FB700;font-weight:600;">Lead</td></tr>
  </table>
  <p style="margin-top:24px;color:#666;font-size:14px;">Added to Google Sheets CRM.</p>
</body>
</html>
  `.trim()
}

export async function POST(request: NextRequest) {
  console.log('[audit-signup] Request received')
  console.log('[audit-signup] Env check:', {
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasSheetEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasSheetKey: !!process.env.GOOGLE_PRIVATE_KEY,
  })

  try {
    const { email } = await request.json()
    console.log('[audit-signup] Email:', email)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Step 1: Google Sheets (non-blocking)
    console.log('[audit-signup] Step 1: writing to Sheets...')
    try {
      await appendToSheet(email)
      console.log('[audit-signup] Step 1: Sheets write OK')
    } catch (err) {
      console.error('[audit-signup] Step 1: Sheets write FAILED:', err)
    }

    // Step 2: Confirmation email to user
    console.log('[audit-signup] Step 2: sending confirmation email to', email)
    const { data: confirmData, error: confirmError } = await resend.emails.send({
      from: 'Padraig Rice <padraig@priceaimarketing.ie>',
      to: email,
      subject: 'Your Free AI Marketing Audit — Next Steps',
      html: confirmationEmailHtml(),
    })
    if (confirmError) {
      console.error('[audit-signup] Step 2: confirmation email FAILED:', JSON.stringify(confirmError))
      return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 })
    }
    console.log('[audit-signup] Step 2: confirmation email OK, id:', confirmData?.id)

    // Step 3: Notification email to Padraig (non-blocking)
    console.log('[audit-signup] Step 3: sending notification to padraig@priceaimarketing.ie')
    const { data: notifyData, error: notifyError } = await resend.emails.send({
      from: 'PRice AI Website <padraig@priceaimarketing.ie>',
      to: 'padraig@priceaimarketing.ie',
      subject: `New Audit Request: ${email}`,
      html: notificationEmailHtml(email),
    })
    if (notifyError) {
      console.error('[audit-signup] Step 3: notification email FAILED:', JSON.stringify(notifyError))
    } else {
      console.log('[audit-signup] Step 3: notification email OK, id:', notifyData?.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[audit-signup] Fatal error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
