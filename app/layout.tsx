import type { Metadata, Viewport } from 'next';
import { ProgressProvider } from '@/components/ProgressProvider';
import { SiteHeader } from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Chapterly', template: '%s · Chapterly' },
  description:
    'Turn what you study into a course: every concept as a checklist, a tutorial you write for each week, and progress that follows you.',
  applicationName: 'Chapterly',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#2f4fd6' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- one shared root layout */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <ProgressProvider>
          <SiteHeader />
          <main>{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
