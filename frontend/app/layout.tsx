import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Imposter Interviewer — Real Questions. Real Pressure.',
  description:
    'An AI voice interviewer that searches the web for the hardest real questions people have actually been asked — from Glassdoor, Reddit, Blind — then grills you live.',
  openGraph: {
    title: 'Imposter Interviewer',
    description: 'Real questions. Real pressure. Real preparation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased">{children}</body>
    </html>
  );
}
