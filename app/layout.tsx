import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: 'Couz Pro',
  description: 'les couz',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={cn(
          GeistSans.className,
          'py-12 px-5 min-h-screen max-w-xl mx-auto'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className={cn('pb-12 font-extralight', GeistMono.className)}>
            <a href="/">couz.pro</a>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
