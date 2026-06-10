import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

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
  const statusBorder = isAttending ? '#b7e4c7' : '#f8adad';
  const statusText = isAttending ? 'Will Attend' : 'Unable to Attend';

  return `
  <div style="background-color: #ede3d9; padding: 40px 16px; font-family: Georgia, 'Times New Roman', serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; border: 1px solid rgba(181, 127, 134, 0.15); overflow: hidden; box-shadow: 0 10px 30px rgba(85, 28, 37, 0.04);">
      
      <!-- Top corners floral banner -->
      <tr>
        <td colspan="2" style="padding: 0; line-height: 0;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" valign="top" style="width: 50%;">
                <img src="cid:rsvp-upper-left" width="130" height="auto" alt="" style="display: block; border: 0;" />
              </td>
              <td align="right" valign="top" style="width: 50%;">
                <img src="cid:rsvp-upper-right" width="110" height="auto" alt="" style="display: block; border: 0;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Header Content -->
      <tr>
        <td colspan="2" align="center" style="padding: 10px 40px 30px 40px; text-align: center;">
          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #8A5A60; margin-bottom: 12px; font-weight: bold;">
            Allyster &amp; Joefren
          </div>
          <div style="color: #B57F86; font-size: 12px; margin-bottom: 12px; line-height: 1;">&#9670;</div>
          <div style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: #551c25; font-weight: bold; margin-bottom: 24px;">
            R.S.V.P. Notification
          </div>
          
          <!-- Status Badge -->
          <div style="margin: 10px 0 15px 0;">
            <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block;">
              <tr>
                <td style="border: 1px solid ${statusBorder}; padding: 10px 36px; background-color: ${statusBg}; border-radius: 30px; text-align: center;">
                  <span style="color: ${statusColor}; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-weight: bold;">
                    ${statusText}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>

      <!-- Content Divider -->
      <tr>
        <td colspan="2" style="padding: 0 40px;">
          <div style="height: 1px; background: linear-gradient(90deg, transparent, #B57F86 30%, #B57F86 70%, transparent);"></div>
        </td>
      </tr>

      <!-- Guest Details -->
      <tr>
        <td colspan="2" style="padding: 40px 40px 20px 40px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-left: 2px solid #B57F86;">
            <tr>
              <td style="padding: 12px 20px; color: #8A5A60; font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; width: 120px; vertical-align: middle;">
                Guest Name
              </td>
              <td style="padding: 12px 10px; color: #551c25; font-family: Georgia, serif; font-size: 18px; font-style: italic; font-weight: bold; vertical-align: middle;">
                ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 20px; color: #8A5A60; font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; vertical-align: middle;">
                Email Address
              </td>
              <td style="padding: 12px 10px; color: #551c25; font-family: Arial, sans-serif; font-size: 13px; vertical-align: middle;">
                <a href="mailto:${data.email}" style="color: #551c25; text-decoration: none; border-bottom: 1px dotted #B57F86;">${data.email}</a>
              </td>
            </tr>
            ${isAttending ? `
            <tr>
              <td style="padding: 12px 20px; color: #8A5A60; font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; vertical-align: middle;">
                Party Size
              </td>
              <td style="padding: 12px 10px; color: #551c25; font-family: Georgia, serif; font-size: 16px; vertical-align: middle;">
                ${data.guests} ${Number(data.guests) === 1 ? 'person' : 'people'}
              </td>
            </tr>
            ${data.dietaryRestrictions?.trim() ? `
            <tr>
              <td style="padding: 12px 20px; color: #8A5A60; font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; vertical-align: top;">
                Dietary Notes
              </td>
              <td style="padding: 12px 10px; color: #551c25; font-family: Arial, sans-serif; font-size: 13px; line-height: 1.6; vertical-align: top;">
                ${data.dietaryRestrictions}
              </td>
            </tr>
            ` : ''}
            ` : ''}
          </table>
        </td>
      </tr>

      <!-- Personal Message -->
      ${data.message?.trim() ? `
      <tr>
        <td colspan="2" style="padding: 0 40px 30px 40px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F5EDE9; border-radius: 16px; border: 1px dashed rgba(181, 127, 134, 0.45);">
            <tr>
              <td style="padding: 24px; text-align: center;">
                <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; color: #8A5A60; margin-bottom: 12px; font-weight: bold;">
                  &#9670; &nbsp; Personal Message &nbsp; &#9670;
                </div>
                <div style="color: #551c25; font-family: Georgia, serif; font-size: 15px; line-height: 1.8; font-style: italic; margin: 0;">
                  &ldquo;${data.message}&rdquo;
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ` : ''}

      <!-- Bottom florals footer -->
      <tr>
        <td colspan="2" style="padding: 0; line-height: 0;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" valign="bottom" style="width: 50%;">
                <img src="cid:rsvp-left" width="110" height="auto" alt="" style="display: block; border: 0;" />
              </td>
              <td align="right" valign="bottom" style="width: 50%;">
                <img src="cid:rsvp-right" width="130" height="auto" alt="" style="display: block; border: 0;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer text bar -->
      <tr>
        <td colspan="2" align="center" style="background-color: #F5EDE9; padding: 24px; text-align: center; border-top: 1px solid rgba(181, 127, 134, 0.1);">
          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #8A5A60; margin-bottom: 6px; font-weight: bold;">
            Allyster &amp; Joefren
          </div>
          <div style="font-family: Arial, sans-serif; font-size: 11px; color: #8A5A60; font-style: italic; margin: 0;">
            This notification was generated from the official wedding invitation website.
          </div>
        </td>
      </tr>

    </table>
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
    text: `Wedding of ${WEDDING.groom} & ${WEDDING.bride}`,
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
  <div style="background-color: #ede3d9; padding: 40px 16px; font-family: Georgia, 'Times New Roman', serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; border: 1px solid rgba(181, 127, 134, 0.15); overflow: hidden; box-shadow: 0 10px 30px rgba(85, 28, 37, 0.04);">
      
      <!-- Top corners floral banner -->
      <tr>
        <td colspan="2" style="padding: 0; line-height: 0;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" valign="top" style="width: 50%;">
                <img src="cid:rsvp-upper-left" width="130" height="auto" alt="" style="display: block; border: 0;" />
              </td>
              <td align="right" valign="top" style="width: 50%;">
                <img src="cid:rsvp-upper-right" width="110" height="auto" alt="" style="display: block; border: 0;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Greeting Content -->
      <tr>
        <td colspan="2" align="center" style="padding: 10px 40px 30px 40px; text-align: center;">
          <div style="font-family: Georgia, serif; font-size: 10px; letter-spacing: 5px; text-transform: uppercase; color: #8A5A60; margin-bottom: 14px; font-weight: bold;">
            &#9670; &nbsp; Thank You &nbsp; &#9670;
          </div>
          <div style="font-family: Georgia, serif; font-size: 26px; font-style: italic; color: #551c25; margin-bottom: 14px; font-weight: normal;">
            Dear ${firstName},
          </div>
          
          ${isAttending ? `
          <p style="color: #551c25; font-family: Georgia, serif; font-size: 14px; line-height: 1.8; margin: 0 auto; max-width: 440px;">
            Thank you for confirming your attendance! We are truly honored and delighted to have you celebrate this special milestone in our lives. Here are the wedding details:
          </p>
          ` : `
          <p style="color: #551c25; font-family: Georgia, serif; font-size: 14px; line-height: 1.8; margin: 0 auto; max-width: 440px;">
            Thank you for letting us know. Although we will miss you at the celebration, we truly appreciate you taking the time to respond. You will always be in our hearts.
          </p>
          `}
        </td>
      </tr>

      <!-- Save The Date & Venue Cards if attending -->
      ${isAttending ? `
      <tr>
        <td colspan="2" style="padding: 0 40px 30px 40px;">
          
          <!-- Divider -->
          <div style="height: 1px; background: linear-gradient(90deg, transparent, #B57F86 30%, #B57F86 70%, transparent); margin-bottom: 30px;"></div>
          
          <!-- Save the Date -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; color: #8A5A60; margin-bottom: 10px; font-weight: bold;">
              &#9670; &nbsp; Save The Date &nbsp; &#9670;
            </div>
            <div style="font-family: Georgia, serif; font-size: 30px; font-style: italic; color: #551c25; margin-bottom: 6px;">
              July 27, 2026
            </div>
            <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8A5A60; font-weight: bold;">
              Monday &bull; 2:00 PM
            </div>
          </div>

          <!-- Venue Stack -->
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <!-- Holy Ceremony -->
            <tr>
              <td style="padding-bottom: 16px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F5EDE9; border-radius: 20px; border: 1px solid rgba(181, 127, 134, 0.15);">
                  <tr>
                    <td style="padding: 24px; text-align: center;">
                      <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; color: #8A5A60; margin-bottom: 10px; font-weight: bold;">
                        &#9670; &nbsp; Holy Ceremony &nbsp; &#9670;
                      </div>
                      <div style="font-family: Georgia, serif; font-size: 18px; font-style: italic; color: #551c25; margin-bottom: 6px; font-weight: normal;">
                        ${WEDDING.ceremony.name}
                      </div>
                      <div style="font-family: Arial, sans-serif; font-size: 12px; color: #8A5A60; margin-bottom: 6px;">
                        ${WEDDING.ceremony.address}
                      </div>
                      <div style="font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; color: #551c25; letter-spacing: 1px; margin-bottom: 16px;">
                        ${WEDDING.ceremony.time}
                      </div>
                      <div>
                        <a href="${WEDDING.ceremony.mapLink}" target="_blank" style="display: inline-block; color: #551c25; font-family: Arial, sans-serif; font-size: 10px; font-weight: bold; text-decoration: none; border: 1px solid #B57F86; padding: 8px 20px; border-radius: 20px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s ease;">
                          View on Map &rarr;
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Reception -->
            <tr>
              <td style="padding-bottom: 30px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F5EDE9; border-radius: 20px; border: 1px solid rgba(181, 127, 134, 0.15);">
                  <tr>
                    <td style="padding: 24px; text-align: center;">
                      <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; color: #8A5A60; margin-bottom: 10px; font-weight: bold;">
                        &#9670; &nbsp; Reception &nbsp; &#9670;
                      </div>
                      <div style="font-family: Georgia, serif; font-size: 18px; font-style: italic; color: #551c25; margin-bottom: 6px; font-weight: normal;">
                        ${WEDDING.reception.name}
                      </div>
                      <div style="font-family: Arial, sans-serif; font-size: 12px; color: #8A5A60; margin-bottom: 6px;">
                        ${WEDDING.reception.address}
                      </div>
                      <div style="font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; color: #551c25; letter-spacing: 1px; margin-bottom: 16px;">
                        ${WEDDING.reception.time}
                      </div>
                      <div>
                        <a href="${WEDDING.reception.mapLink}" target="_blank" style="display: inline-block; color: #551c25; font-family: Arial, sans-serif; font-size: 10px; font-weight: bold; text-decoration: none; border: 1px solid #B57F86; padding: 8px 20px; border-radius: 20px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s ease;">
                          View on Map &rarr;
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Google Calendar CTA -->
          <div style="text-align: center; margin-bottom: 30px;">
            <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block;">
              <tr>
                <td style="background-color: #551c25; border-radius: 30px; text-align: center;">
                  <a href="${calendarLink}" target="_blank" style="display: inline-block; color: #ede3d9; font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; text-decoration: none; padding: 14px 36px; letter-spacing: 2px; text-transform: uppercase; border-radius: 30px;">
                    Add to Google Calendar
                  </a>
                </td>
              </tr>
            </table>
            <div style="font-family: Georgia, serif; font-size: 11px; color: #8A5A60; font-style: italic; margin-top: 10px;">
              Save it to your schedule
            </div>
          </div>

          <!-- Dress Code -->
          <div style="text-align: center; padding: 24px 0; border-top: 1px solid rgba(181, 127, 134, 0.15); border-bottom: 1px solid rgba(181, 127, 134, 0.15); margin-bottom: 30px;">
            <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; color: #8A5A60; margin-bottom: 8px; font-weight: bold;">
              Dress Code
            </div>
            <div style="font-family: Georgia, serif; font-size: 16px; font-style: italic; color: #551c25;">
              Formal Attire
            </div>
          </div>

          <!-- Guidelines Card -->
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F5EDE9; border-radius: 20px; border: 1px solid rgba(181, 127, 134, 0.15);">
            <tr>
              <td style="padding: 24px;">
                <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 3px; color: #8A5A60; margin-bottom: 14px; text-align: center; font-weight: bold;">
                  &#9670; &nbsp; RSVP Guidelines &nbsp; &#9670;
                </div>
                <div style="font-family: Georgia, serif; font-size: 13.5px; color: #551c25; line-height: 1.8; margin-bottom: 14px; text-align: center; font-style: italic;">
                  We kindly request your response on or before June 30, 2026.
                </div>
                
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 12.5px; color: #551c25; line-height: 1.7;">
                  <tr>
                    <td valign="top" style="padding: 4px 10px 4px 0; color: #B57F86; font-size: 14px;">&bull;</td>
                    <td valign="top" style="padding: 4px 0;">Please confirm the attendance of all invited guests listed on your invitation.</td>
                  </tr>
                  <tr>
                    <td valign="top" style="padding: 4px 10px 4px 0; color: #B57F86; font-size: 14px;">&bull;</td>
                    <td valign="top" style="padding: 4px 0;">Due to limited seating, we respectfully ask that only the guests named on the invitation attend.</td>
                  </tr>
                  <tr>
                    <td valign="top" style="padding: 4px 10px 4px 0; color: #B57F86; font-size: 14px;">&bull;</td>
                    <td valign="top" style="padding: 4px 0;">If your plans change, kindly let us know as soon as possible.</td>
                  </tr>
                </table>
                
                <div style="font-family: Georgia, serif; font-size: 13px; color: #8A5A60; line-height: 1.7; margin: 16px 0; text-align: center; font-style: italic;">
                  Your response helps us ensure a wonderful experience for everyone.
                </div>
                
                <div style="font-family: Georgia, serif; font-size: 15px; text-align: center; font-style: italic; color: #8A5A60; font-weight: bold; margin-top: 10px;">
                  Allyster Rey &amp; Joefren Maris 
                </div>
              </td>
            </tr>
          </table>

        </td>
      </tr>
      ` : `
      <!-- Non-attending warm message -->
      <tr>
        <td colspan="2" style="padding: 0 40px 30px 40px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F5EDE9; border-radius: 20px; border: 1px solid rgba(181, 127, 134, 0.15);">
            <tr>
              <td style="padding: 30px; text-align: center;">
                <div style="font-family: Arial, sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; color: #8A5A60; margin-bottom: 12px; font-weight: bold;">
                  &#9670; &nbsp; With Love &nbsp; &#9670;
                </div>
                <p style="color: #551c25; font-family: Georgia, serif; font-size: 14px; line-height: 1.8; margin: 0; font-style: italic;">
                  We hope to catch up and see you soon in the future. Wishing you all the best, and thank you for being a cherished part of our story.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      `}

      <!-- Wax seal or details separator -->
      <tr>
        <td colspan="2" align="center" style="padding: 10px 40px 20px 40px; text-align: center;">
          <img src="cid:wax-seal" width="60" height="60" alt="Wax Seal" style="display: block; width: 60px; height: 60px; margin: 0 auto; border: 0;" />
        </td>
      </tr>

      <!-- Bottom florals footer -->
      <tr>
        <td colspan="2" style="padding: 0; line-height: 0;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" valign="bottom" style="width: 50%;">
                <img src="cid:rsvp-left" width="110" height="auto" alt="" style="display: block; border: 0;" />
              </td>
              <td align="right" valign="bottom" style="width: 50%;">
                <img src="cid:rsvp-right" width="130" height="auto" alt="" style="display: block; border: 0;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer text bar -->
      <tr>
        <td colspan="2" align="center" style="background-color: #F5EDE9; padding: 24px; text-align: center; border-top: 1px solid rgba(181, 127, 134, 0.1);">
          <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #8A5A60; margin-bottom: 6px; font-weight: bold;">
            ${WEDDING.groom} &amp; ${WEDDING.bride}
          </div>
          <div style="font-family: Arial, sans-serif; font-size: 11px; color: #8A5A60; font-style: italic; margin: 0;">
            July 27, 2026 &bull; Pulilan, Bulacan
          </div>
        </td>
      </tr>

    </table>
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

    const floralAttachments = [
      {
        filename: 'RSVP-upper-left.png',
        path: path.join(process.cwd(), 'public/assets/images/RSVP-upper-left.png'),
        cid: 'rsvp-upper-left',
      },
      {
        filename: 'RSVP-upper-right.png',
        path: path.join(process.cwd(), 'public/assets/images/RSVP-upper-right.png'),
        cid: 'rsvp-upper-right',
      },
      {
        filename: 'RSVP-left.png',
        path: path.join(process.cwd(), 'public/assets/images/RSVP-left.png'),
        cid: 'rsvp-left',
      },
      {
        filename: 'RSVP-right.png',
        path: path.join(process.cwd(), 'public/assets/images/RSVP-right.png'),
        cid: 'rsvp-right',
      },
    ];

    const guestAttachments = [
      ...floralAttachments,
      {
        filename: 'wax-seal.png',
        path: path.join(process.cwd(), 'public/assets/images/wax-seal.png'),
        cid: 'wax-seal',
      },
    ];

    await Promise.all([
      // Send notification to couple
      transporter.sendMail({
        from: `"Allyster & Joefren's Wedding" <${process.env.STMP_USER}>`,
        to: process.env.STMP_USER,
        subject: notificationSubject,
        html: buildEmailHtml(body),
        attachments: floralAttachments,
      }),
      // Send confirmation to guest
      transporter.sendMail({
        from: `"Allyster & Joefren's Wedding" <${process.env.STMP_USER}>`,
        to: body.email,
        subject: confirmationSubject,
        html: buildGuestConfirmationHtml(body),
        attachments: guestAttachments,
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

