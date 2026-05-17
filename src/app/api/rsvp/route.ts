import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface RsvpPayload {
  name: string;
  email: string;
  attendance: 'yes' | 'no';
  guests: string;
  dietaryRestrictions: string;
  message: string;
}

const REQUIRED_FIELDS: (keyof RsvpPayload)[] = ['name', 'email', 'attendance'];

function validatePayload(body: unknown): body is RsvpPayload {
  if (!body || typeof body !== 'object') return false;
  const data = body as Record<string, unknown>;
  return REQUIRED_FIELDS.every(
    (field) => typeof data[field] === 'string' && (data[field] as string).trim().length > 0,
  );
}

function buildEmailHtml(data: RsvpPayload): string {
  const isAttending = data.attendance === 'yes';
  const statusColor = isAttending ? '#2d6a4f' : '#9d0208';
  const statusBg = isAttending ? '#d8f3dc' : '#fce4e4';
  const statusText = isAttending ? 'Will Attend' : 'Unable to Attend';

  // Enhanced Wedding RSVP Email Template
// Drop-in replacement — paste this function body where your original return statement was.
// Requires: statusBg, statusColor, statusText, isAttending, data (same as before)

return `
  <div style="font-family: Georgia, 'Times New Roman', serif; width: 100%; max-width: 800px; margin: 0 auto; box-shadow: 0 8px 48px rgba(45,18,18,0.22);">

    <!-- Gold top accent stripe -->
    <div style="height: 5px; background: linear-gradient(90deg, #6b4e10 0%, #c9a96e 22%, #e8d08a 50%, #c9a96e 78%, #6b4e10 100%);"></div>

    <!-- Header -->
    <div style="background: linear-gradient(168deg, #5a1e27 0%, #3d1219 60%, #28090e 100%); padding: 52px 48px 44px; text-align: center;">

      <!-- Couple names in gold spaced caps -->
      <p style="color: #c9a96e; font-size: 11px; letter-spacing: 5px; margin: 0 0 20px; text-transform: uppercase; font-weight: 400;">
         Allyster &amp; Joefren 
      </p>

      <!-- Ornamental rule with diamond -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 22px;">
        <tr>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.30);"></td>
          <td style="padding: 0 16px; color: #c9a96e; font-size: 13px; white-space: nowrap; text-align: center;">&#9670;</td>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.30);"></td>
        </tr>
      </table>

      <!-- Monogram -->
      <div style="margin-bottom: 16px; line-height: 1;">
        <span style="color: #fdfbf7; font-size: 64px; font-weight: 400; font-style: italic; letter-spacing: -2px;">J</span>
        <span style="color: #c9a96e; font-size: 34px; font-weight: 400; font-style: normal; margin: 0 14px;">&amp;</span>
        <span style="color: #fdfbf7; font-size: 64px; font-weight: 400; font-style: italic; letter-spacing: -2px;">A</span>
      </div>

      <!-- Occasion subtitle -->
      <p style="color: rgba(201,169,110,0.65); font-size: 10.5px; letter-spacing: 7px; margin: 0 0 30px; text-transform: uppercase; font-weight: 400;">
        Wedding Celebration
      </p>

      <!-- Three-diamond ornamental rule -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
        <tr>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.20);"></td>
          <td style="padding: 0 12px; color: rgba(201,169,110,0.50); font-size: 8px; white-space: nowrap; text-align: center; letter-spacing: 6px;">&#9670; &nbsp; &#9670; &nbsp; &#9670;</td>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.20);"></td>
        </tr>
      </table>

      <!-- Notification label -->
      <p style="color: rgba(253,251,247,0.65); font-size: 10px; letter-spacing: 5px; margin: 0; text-transform: uppercase;">
        R.S.V.P. &nbsp; Notification
      </p>

    </div>

    <!-- Gold rule under header -->
    <div style="height: 2px; background: linear-gradient(90deg, transparent, #c9a96e 18%, #e8d49a 50%, #c9a96e 82%, transparent);"></div>

    <!-- Body -->
    <div style="background: #fdfbf7; border-left: 1px solid #e2d5c5; border-right: 1px solid #e2d5c5; padding: 48px 48px 40px;">

      <!-- Status indicator (no emoji, elegant bordered box) -->
      <div style="text-align: center; margin-bottom: 44px;">
        <div style="display: inline-block; border: 1.5px solid ${statusColor}; padding: 13px 44px; background: ${statusBg};">
          <span style="color: ${statusColor}; font-size: 10.5px; letter-spacing: 4px; text-transform: uppercase; font-weight: 400;">
            ${statusText}
          </span>
        </div>
      </div>

      <!-- Three-diamond ornament -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
        <tr>
          <td style="text-align: center;">
            <span style="color: #c9a96e; font-size: 8px; letter-spacing: 12px;">&#9670;&nbsp;&#9670;&nbsp;&#9670;</span>
          </td>
        </tr>
      </table>

      <!-- Guest details table with gold left border -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px; border-left: 2px solid #c9a96e;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #ede4d8; color: #8b7d6b; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; width: 130px; vertical-align: middle;">
            Guest Name
          </td>
          <td style="padding: 16px 26px; border-bottom: 1px solid #ede4d8; color: #2d2926; font-size: 17px; font-style: italic; vertical-align: middle;">
            ${data.name}
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #ede4d8; color: #8b7d6b; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; vertical-align: middle;">
            Email Address
          </td>
          <td style="padding: 16px 26px; border-bottom: 1px solid #ede4d8; font-size: 13px; vertical-align: middle;">
            <a href="mailto:${data.email}" style="color: #551c25; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        ${isAttending ? `
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #ede4d8; color: #8b7d6b; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; vertical-align: middle;">
            Party Size
          </td>
          <td style="padding: 16px 26px; border-bottom: 1px solid #ede4d8; color: #2d2926; font-size: 17px; vertical-align: middle;">
            ${data.guests} ${Number(data.guests) === 1 ? 'person' : 'people'}
          </td>
        </tr>
        ${data.dietaryRestrictions?.trim() ? `
        <tr>
          <td style="padding: 16px 20px 20px; color: #8b7d6b; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;">
            Dietary Notes
          </td>
          <td style="padding: 16px 26px 20px; color: #2d2926; font-size: 14px; vertical-align: top; line-height: 1.6;">
            ${data.dietaryRestrictions}
          </td>
        </tr>
        ` : ''}
        ` : ''}
      </table>

      <!-- Personal message block -->
      ${data.message?.trim() ? `
      <div style="padding: 30px 38px; background: #f9f3eb; border-top: 1px solid #ddd0bc; border-bottom: 1px solid #ddd0bc; margin-bottom: 4px;">
        <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 18px; text-align: center;">
          &#9670; &nbsp; Personal Message &nbsp; &#9670;
        </p>
        <p style="color: #3d2d28; font-size: 15px; line-height: 1.9; margin: 0; font-style: italic; text-align: center;">
          &ldquo;${data.message}&rdquo;
        </p>
      </div>
      ` : ''}

    </div>

    <!-- Gold rule above footer -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent, #c9a96e 18%, #e8d49a 50%, #c9a96e 82%, transparent); border-left: 1px solid #e2d5c5; border-right: 1px solid #e2d5c5;"></div>

    <!-- Footer -->
    <div style="background: #f5ede0; padding: 30px 48px; text-align: center; border: 1px solid #e2d5c5; border-top: none;">
      <p style="color: #c9a96e; font-size: 9px; letter-spacing: 5px; text-transform: uppercase; margin: 0 0 9px;">
        Joefren &amp; Allyster
      </p>
      <p style="color: #a89888; font-size: 11px; margin: 0; font-style: italic;">
        This notification was generated from the official wedding invitation website.
      </p>
    </div>

    <!-- Gold bottom accent stripe -->
    <div style="height: 3px; background: linear-gradient(90deg, #6b4e10 0%, #c9a96e 22%, #e8d08a 50%, #c9a96e 78%, #6b4e10 100%);"></div>

  </div>
`;
}

// Wedding constants for email content
const WEDDING = {
  date: new Date('2026-07-27T16:00:00'),
  bride: 'Joefren',
  groom: 'Allyster',
  ceremony: {
    name: 'Santo Cristo Parish Church',
    address: 'Pulilan, Bulacan',
    time: '2:00 PM',
    mapLink: 'https://www.google.com/maps/place/Sto+Cristo+Parish+Church/@14.902977,120.8676781,770m/data=!3m1!1e3!4m6!3m5!1s0x339654e90d6b2b15:0x78a0778fe25b9e97!8m2!3d14.9033088!4d120.8693625!16s%2Fg%2F11c74gnsc4?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
  },
  reception: {
    name: 'Casa Alpedro',
    address: 'Pulilan, Bulacan',
    time: '4:00 PM',
    mapLink: 'https://www.google.com/maps/place/Casa+Alpedro/@14.9023031,120.8711972,770m/data=!3m1!1e3!4m6!3m5!1s0x339655ed954a7431:0xe5b3ca98ad2096fe!8m2!3d14.9031354!4d120.8739135!16s%2Fg%2F11q51yrkgs?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
  },
};

function buildGoogleCalendarLink(): string {
  const start = WEDDING.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(WEDDING.date.getTime() + 5 * 60 * 60 * 1000);
  const end = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    text: `Wedding of ${WEDDING.bride} & ${WEDDING.groom}`,
    dates: `${start}/${end}`,
    details: `Ceremony at ${WEDDING.ceremony.name} (${WEDDING.ceremony.time}), Reception at ${WEDDING.reception.name} (${WEDDING.reception.time})`,
    location: `${WEDDING.ceremony.name}, ${WEDDING.ceremony.address}`,
  });

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&${params.toString()}`;
}

function buildGuestConfirmationHtml(data: RsvpPayload): string {
  const isAttending = data.attendance === 'yes';
  const calendarLink = buildGoogleCalendarLink();
  const firstName = data.name.split(' ')[0];

  return `
  <div style="font-family: Georgia, 'Times New Roman', serif; width: 100%; max-width: 800px; margin: 0 auto; box-shadow: 0 8px 48px rgba(45,18,18,0.22);">

    <!-- Gold top accent stripe -->
    <div style="height: 5px; background: linear-gradient(90deg, #6b4e10 0%, #c9a96e 22%, #e8d08a 50%, #c9a96e 78%, #6b4e10 100%);"></div>

    <!-- Header -->
    <div style="background: linear-gradient(168deg, #5a1e27 0%, #3d1219 60%, #28090e 100%); padding: 52px 48px 44px; text-align: center;">

      <!-- Couple names in gold spaced caps -->
      <p style="color: #c9a96e; font-size: 11px; letter-spacing: 5px; margin: 0 0 20px; text-transform: uppercase; font-weight: 400;">
        ${WEDDING.bride} &amp; ${WEDDING.groom}
      </p>

      <!-- Ornamental rule with diamond -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 22px;">
        <tr>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.30);"></td>
          <td style="padding: 0 16px; color: #c9a96e; font-size: 13px; white-space: nowrap; text-align: center;">&#9670;</td>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.30);"></td>
        </tr>
      </table>

      <!-- Monogram -->
      <div style="margin-bottom: 16px; line-height: 1;">
        <span style="color: #fdfbf7; font-size: 64px; font-weight: 400; font-style: italic; letter-spacing: -2px;">J</span>
        <span style="color: #c9a96e; font-size: 34px; font-weight: 400; font-style: normal; margin: 0 14px;">&amp;</span>
        <span style="color: #fdfbf7; font-size: 64px; font-weight: 400; font-style: italic; letter-spacing: -2px;">A</span>
      </div>

      <!-- Occasion subtitle -->
      <p style="color: rgba(201,169,110,0.65); font-size: 10.5px; letter-spacing: 7px; margin: 0 0 30px; text-transform: uppercase; font-weight: 400;">
        Wedding Celebration
      </p>

      <!-- Three-diamond ornamental rule -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
        <tr>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.20);"></td>
          <td style="padding: 0 12px; color: rgba(201,169,110,0.50); font-size: 8px; white-space: nowrap; text-align: center; letter-spacing: 6px;">&#9670; &nbsp; &#9670; &nbsp; &#9670;</td>
          <td style="border-bottom: 1px solid rgba(201,169,110,0.20);"></td>
        </tr>
      </table>

      <!-- Confirmation label -->
      <p style="color: rgba(253,251,247,0.65); font-size: 10px; letter-spacing: 5px; margin: 0; text-transform: uppercase;">
        R.S.V.P. &nbsp; Confirmation
      </p>

    </div>

    <!-- Gold rule under header -->
    <div style="height: 2px; background: linear-gradient(90deg, transparent, #c9a96e 18%, #e8d49a 50%, #c9a96e 82%, transparent);"></div>

    <!-- Body -->
    <div style="background: #fdfbf7; border-left: 1px solid #e2d5c5; border-right: 1px solid #e2d5c5; padding: 48px 48px 40px;">

      <!-- Greeting -->
      <div style="text-align: center; margin-bottom: 36px;">
        <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 16px;">
          &#9670; &nbsp; Thank You &nbsp; &#9670;
        </p>
        <p style="color: #2d2926; font-size: 22px; margin: 0 0 12px; font-style: italic;">
          Dear ${firstName},
        </p>
        ${isAttending ? `
        <p style="color: #5a4a3a; font-size: 14px; line-height: 1.8; margin: 0; max-width: 420px; display: inline-block;">
          Thank you for confirming your attendance! We are truly honored to have you celebrate this special day with us. Here are the details you&rsquo;ll need:
        </p>
        ` : `
        <p style="color: #5a4a3a; font-size: 14px; line-height: 1.8; margin: 0; max-width: 420px; display: inline-block;">
          Thank you for letting us know. Although we&rsquo;ll miss you on our special day, we truly appreciate you taking the time to respond. You&rsquo;ll always be in our hearts.
        </p>
        `}
      </div>

      ${isAttending ? `
      <!-- Three-diamond ornament -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
        <tr>
          <td style="text-align: center;">
            <span style="color: #c9a96e; font-size: 8px; letter-spacing: 12px;">&#9670;&nbsp;&#9670;&nbsp;&#9670;</span>
          </td>
        </tr>
      </table>

      <!-- Wedding Date -->
      <div style="text-align: center; margin-bottom: 40px;">
        <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 14px;">
          &#9670; &nbsp; Save The Date &nbsp; &#9670;
        </p>
        <p style="color: #2d2926; font-size: 28px; margin: 0 0 6px; font-style: italic;">
          July 27, 2026
        </p>
        <p style="color: #8b7d6b; font-size: 13px; margin: 0; letter-spacing: 1px;">
          Monday
        </p>
      </div>

      <!-- Venue Cards -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
        <!-- Ceremony -->
        <tr>
          <td style="padding: 0 0 16px;">
            <div style="background: #f9f3eb; border: 1px solid #ede4d8; padding: 28px 32px;">
              <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 14px; text-align: center;">
                &#9670; &nbsp; Holy Ceremony &nbsp; &#9670;
              </p>
              <p style="color: #2d2926; font-size: 18px; margin: 0 0 6px; text-align: center; font-style: italic;">
                ${WEDDING.ceremony.name}
              </p>
              <p style="color: #8b7d6b; font-size: 13px; margin: 0 0 4px; text-align: center;">
                ${WEDDING.ceremony.address}
              </p>
              <p style="color: #551c25; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-align: center; letter-spacing: 1px;">
                ${WEDDING.ceremony.time}
              </p>
              <div style="text-align: center;">
                <a href="${WEDDING.ceremony.mapLink}" target="_blank" style="display: inline-block; color: #551c25; font-size: 11px; text-decoration: none; border: 1px solid #c9a96e; padding: 8px 24px; letter-spacing: 2px; text-transform: uppercase;">
                  View on Map &rarr;
                </a>
              </div>
            </div>
          </td>
        </tr>
        <!-- Reception -->
        <tr>
          <td style="padding: 0;">
            <div style="background: #f9f3eb; border: 1px solid #ede4d8; padding: 28px 32px;">
              <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 14px; text-align: center;">
                &#9670; &nbsp; Reception &nbsp; &#9670;
              </p>
              <p style="color: #2d2926; font-size: 18px; margin: 0 0 6px; text-align: center; font-style: italic;">
                ${WEDDING.reception.name}
              </p>
              <p style="color: #8b7d6b; font-size: 13px; margin: 0 0 4px; text-align: center;">
                ${WEDDING.reception.address}
              </p>
              <p style="color: #551c25; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-align: center; letter-spacing: 1px;">
                ${WEDDING.reception.time}
              </p>
              <div style="text-align: center;">
                <a href="${WEDDING.reception.mapLink}" target="_blank" style="display: inline-block; color: #551c25; font-size: 11px; text-decoration: none; border: 1px solid #c9a96e; padding: 8px 24px; letter-spacing: 2px; text-transform: uppercase;">
                  View on Map &rarr;
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- Add to Calendar CTA -->
      <div style="text-align: center; margin-bottom: 40px;">
        <a href="${calendarLink}" target="_blank" style="display: inline-block; background: linear-gradient(168deg, #5a1e27 0%, #3d1219 100%); color: #fdfbf7; font-size: 11px; text-decoration: none; padding: 16px 44px; letter-spacing: 3px; text-transform: uppercase;">
          Add to Google Calendar
        </a>
        <p style="color: #a89888; font-size: 11px; margin: 14px 0 0; font-style: italic;">
          Never miss this special day
        </p>
      </div>

      <!-- Dress Code Reminder -->
      <div style="text-align: center; padding: 24px 32px; border-top: 1px solid #ede4d8; border-bottom: 1px solid #ede4d8;">
        <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 10px;">
          Dress Code
        </p>
        <p style="color: #2d2926; font-size: 15px; margin: 0; font-style: italic;">
          Formal Attire
        </p>
      </div>
      ` : `
      <!-- Non-attending warm message -->
      <div style="text-align: center; padding: 32px; background: #f9f3eb; border: 1px solid #ede4d8; margin-bottom: 20px;">
        <p style="color: #c9a96e; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0 0 16px;">
          &#9670; &nbsp; With Love &nbsp; &#9670;
        </p>
        <p style="color: #5a4a3a; font-size: 14px; line-height: 1.8; margin: 0; font-style: italic;">
          We hope to see you soon. Wishing you all the best, and thank you for being part of our story.
        </p>
      </div>
      `}

    </div>

    <!-- Gold rule above footer -->
    <div style="height: 1px; background: linear-gradient(90deg, transparent, #c9a96e 18%, #e8d49a 50%, #c9a96e 82%, transparent); border-left: 1px solid #e2d5c5; border-right: 1px solid #e2d5c5;"></div>

    <!-- Footer -->
    <div style="background: #f5ede0; padding: 30px 48px; text-align: center; border: 1px solid #e2d5c5; border-top: none;">
      <p style="color: #c9a96e; font-size: 9px; letter-spacing: 5px; text-transform: uppercase; margin: 0 0 9px;">
        ${WEDDING.bride} &amp; ${WEDDING.groom}
      </p>
      <p style="color: #a89888; font-size: 11px; margin: 0; font-style: italic;">
        July 27, 2026 &bull; Pulilan, Bulacan
      </p>
    </div>

    <!-- Gold bottom accent stripe -->
    <div style="height: 3px; background: linear-gradient(90deg, #6b4e10 0%, #c9a96e 22%, #e8d08a 50%, #c9a96e 78%, #6b4e10 100%);"></div>

  </div>
`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and attendance.' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.STMP_HOST,
      port: Number(process.env.STMP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASS,
      },
    });

    const isAttending = body.attendance === 'yes';

    // Notification email to the couple
    const notificationSubject = isAttending
      ? `RSVP: ${body.name} will attend!`
      : `RSVP: ${body.name} is unable to attend`;

    // Confirmation email to the guest
    const confirmationSubject = isAttending
      ? `You're confirmed! See you at Allyster & Joefren's Wedding `
      : `Thank you for your response — Allyster & Joefren's Wedding`;

    await Promise.all([
      // Send notification to couple
      transporter.sendMail({
        from: `"Allyster & Joefren's Wedding" <${process.env.STMP_USER}>`,
        to: process.env.STMP_USER,
        subject: notificationSubject,
        html: buildEmailHtml(body),
      }),
      // Send confirmation to guest
      transporter.sendMail({
        from: `"Allyster & Joefren's Wedding" <${process.env.STMP_USER}>`,
        to: body.email,
        subject: confirmationSubject,
        html: buildGuestConfirmationHtml(body),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RSVP email error:', error);
    return NextResponse.json(
      { error: 'Failed to send RSVP. Please try again later.' },
      { status: 500 },
    );
  }
}
