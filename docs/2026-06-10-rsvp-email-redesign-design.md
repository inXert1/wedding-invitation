# Design Spec: Recreating RSVP Email Design (Draft 3: Delicate Romantic)

* **Date:** 2026-06-10
* **Status:** Proposed
* **Topic:** Recreating RSVP Email UI/UX

---

## 1. Goal

Recreate both the RSVP notification email (sent to the couple) and the RSVP confirmation email (sent to the guest) to match the Delicate Romantic design aesthetic of the wedding invitation website.

---

## 2. Design Aesthetics & Colors

To ensure a seamless transition from the website UI/UX to the email inbox, the email templates will adopt the following design tokens:

* **Backgrounds:**
  * Outer email container backdrop: `#ede3d9` (matching `--color-snow`)
  * Inner content card backdrop: `#F5EDE9` (matching `--color-snow-warm`) or `#ffffff`
* **Typography:**
  * Primary Serif (Headings): Georgia, Garamond, serif (matching `--font-very-vogue-display` / `--font-very-vogue-text` fallback)
  * Secondary Script (Accents / Titles): Italic Georgia (fallback for Darleston / Ballet)
  * Clean Sans-serif (Metadata / Forms): Arial, system-ui, sans-serif (matching `--font-dm-sans`)
* **Color System:**
  * Main Text: `#551c25` (`--color-midnight`)
  * Accents & Dividers: `#B57F86` (`--color-amethyst`)
  * Secondary Highlights: `#8A5A60` (`--color-amethyst-dark`)
  * Attendance Status Badges:
    * Will Attend: Green background (`#d8f3dc`) and text (`#2d6a4f`)
    * Unable to Attend: Red background (`#fce4e4`) and text (`#9d0208`)

---

## 3. Visual Assets & Corner Florals

To replicate the "Delicate Romantic" feel, the email layout will position the website's original assets at the corners using Content-ID (CID) inline attachments:

* **Header (Top Corners):**
  * `rsvp-upper-left` -> `/assets/images/RSVP-upper-left.png`
  * `rsvp-upper-right` -> `/assets/images/RSVP-upper-right.png`
* **Footer (Bottom Corners):**
  * `rsvp-left` -> `/assets/images/RSVP-left.png`
  * `rsvp-right` -> `/assets/images/RSVP-right.png`
* **Ornaments:**
  * `wax-seal` -> `/assets/images/wax-seal.png` (used in guest confirmation email footer)

---

## 4. Email Layout Architecture

The emails will be built using clean, email-safe HTML tables:

1. **Outer Wrapper:** A `<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ede3d9;">` to set the canvas.
2. **Main Card:** An inner table representing the card (max-width `650px`) with rounded corners (`border-radius: 24px;`), clean padding, and a border (`border: 1px solid rgba(181, 127, 134, 0.15);`).
3. **Corner Florals:** Positioned dynamically inside header and footer rows.
4. **Content Sections:**
   * Centered romantic typography for headings.
   * A details block table with a gold/amethyst left accent border.
   * Styled container for the personal message in centered italic Georgia font.
   * In confirmation emails: styled Cards for Venue Ceremony/Reception and a distinct button link for Google Calendar.

---

## 5. Technical Implementation Details

### API Route Changes
We will modify [route.ts](file:///c:/Users/user/invitation/wedding-invitation/src/app/api/rsvp/route.ts):

* **Attachments Helper:** Load the local PNG files dynamically from the project workspace:
  ```typescript
  import path from 'path';

  const imageAttachments = [
    {
      filename: 'RSVP-upper-left.png',
      path: path.join(process.cwd(), 'public/assets/images/RSVP-upper-left.png'),
      cid: 'rsvp-upper-left'
    },
    {
      filename: 'RSVP-upper-right.png',
      path: path.join(process.cwd(), 'public/assets/images/RSVP-upper-right.png'),
      cid: 'rsvp-upper-right'
    },
    {
      filename: 'RSVP-left.png',
      path: path.join(process.cwd(), 'public/assets/images/RSVP-left.png'),
      cid: 'rsvp-left'
    },
    {
      filename: 'RSVP-right.png',
      path: path.join(process.cwd(), 'public/assets/images/RSVP-right.png'),
      cid: 'rsvp-right'
    },
    {
      filename: 'wax-seal.png',
      path: path.join(process.cwd(), 'public/assets/images/wax-seal.png'),
      cid: 'wax-seal'
    }
  ];
  ```
* **Nodemailer sendMail Configuration:** Include the `attachments` array in both emails (Notification and Confirmation).

---

## 6. Verification Plan

* **Visual & Styling Check:** View code structure.
* **Build Verification:** Run `npm run build` or `next build` to verify that routing/typing is fully valid.
