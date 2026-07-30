import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayıt Formu | Şirinevler Final Dershanesi',
  description: 'Şirinevler Final Dershanesi kayıt formu. Başvurunuzu hemen yapın.',
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
