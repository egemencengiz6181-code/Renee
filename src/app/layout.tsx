import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bahcelievlersevinc.com'),
  title: {
    default: 'Bahçelievler Sevinç Dershanesi | Bahçelievler İstanbul',
    template: '%s | Bahçelievler Sevinç Dershanesi',
  },
  description: "Bahçelievler Sevinç Dershanesi — Ortaokul, lise ve YKS hazırlık ders programları. Deneyimli öğretmenler ve kişisel takip ile hedef okuluna giden yol.",
  keywords: ['dershane', 'bahçelievler', 'istanbul', 'YKS', 'LGS', 'ders programı', 'üniversite hazırlık', 'sevinç dershanesi', 'bahçelievler dershane'],
  authors: [{ name: 'Bahçelievler Sevinç Dershanesi', url: 'https://www.bahcelievlersevinc.com' }],
  creator: 'Bahçelievler Sevinç Dershanesi',
  publisher: 'Bahçelievler Sevinç Dershanesi',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/logos/Sevinc-Kurs-Logo.png',
    apple: '/logos/Sevinc-Kurs-Logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Bahçelievler Sevinç Dershanesi',
    locale: 'tr_TR',
    images: [{ url: '/logos/Sevinc-Kurs-Logo.png', width: 512, height: 512, alt: 'Bahçelievler Sevinç Dershanesi' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sevincdershanesi',
    creator: '@sevincdershanesi',
  },
  verification: {
    google: '',
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
