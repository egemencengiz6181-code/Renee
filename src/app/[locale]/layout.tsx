import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  const origin = 'https://www.bahcelievlersevinc.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Bahçelievler dershane',
      'Bahçelievler Sevinç',
      'YKS hazırlık',
      'LGS hazırlık',
      'ortaokul dershane',
      'lise dershane',
      'İstanbul dershane',
      'özel ders',
      'üniversite hazırlık',
      'Şirinevler dershane',
      'Siyavuşpaşa dershane',
      'etüt merkezi',
    ],
    category: 'education',
    alternates: {
      canonical: `${origin}/${locale}`,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Bahçelievler Sevinç Dershanesi',
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
      images: [
        {
          url: `${origin}/logos/Sevinc-Kurs-Logo.png`,
          width: 1200,
          height: 630,
          alt: 'Bahçelievler Sevinç Dershanesi',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/logos/Sevinc-Kurs-Logo.png',
      apple: '/logos/Sevinc-Kurs-Logo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Bahçelievler Sevinç Dershanesi',
    url: 'https://www.bahcelievlersevinc.com',
    logo: 'https://www.bahcelievlersevinc.com/logos/Sevinc-Kurs-Logo.png',
    description: 'Bahçelievler Sevinç Dershanesi — Ortaokul, lise ve YKS hazırlık ders programları.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bahçelievler',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    areaServed: {
      '@type': 'City',
      name: 'İstanbul',
    },
  };

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans" suppressHydrationWarning>
        <Providers locale={locale} messages={messages ?? {}}>
            <Navbar />
            <main className="relative z-10 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileStickyButton />
        </Providers>
      </body>
    </html>
  );
}
