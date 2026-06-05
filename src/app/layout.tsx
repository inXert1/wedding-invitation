import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { LangProvider, LocalizationProvider } from '@/locales';
import { Toaster } from 'sonner';

const bruney = localFont({
  src: '../../fonts/ss-bruney.otf',
  variable: '--font-bruney',
  display: 'swap',
});

const darleston = localFont({
  src: '../../fonts/Darleston.otf',
  variable: '--font-darleston',
  display: 'swap',
});

const veryVogueDisplay = localFont({
  src: '../../fonts/Very_Vogue_Font/Webfonts/VeryVogueDisplay.woff2',
  variable: '--font-very-vogue-display',
  display: 'swap',
});

const veryVogueText = localFont({
  src: '../../fonts/Very_Vogue_Font/Webfonts/VeryVogueText.woff2',
  variable: '--font-very-vogue-text',
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Wedding of Allyster & Joefren — July 27, 2026',
  description:
    'You are cordially invited to celebrate the union of Allyster and Joefren. Discover our love story, wedding details, and RSVP.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bruney.variable} ${darleston.variable} ${veryVogueDisplay.variable} ${veryVogueText.variable} ${playfair.variable} ${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <LangProvider>
          <LocalizationProvider>
            {children}
            <Toaster />
          </LocalizationProvider>
        </LangProvider>
      </body>
    </html>
  );
}

