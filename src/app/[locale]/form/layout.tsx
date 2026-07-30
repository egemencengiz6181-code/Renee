import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Formu | Bahçelievler Sevinç Dershanesi',
  description: 'Bahçelievler Sevinç Dershanesi kayıt formu. Başvurunuzu hemen yapın.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
