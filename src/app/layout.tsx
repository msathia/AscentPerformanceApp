import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ascend Performance',
  description: 'Talent Management and Performance Review Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-[250px] bg-gray-100 border-r border-gray-200">
            <nav className="p-4">
              <ul>
                <li className="mb-2">
                  <Link href="/" className="block p-2 rounded-md hover:bg-gray-200">Home</Link>
                </li>
                <li className="mb-2">
                  <Link href="/self-evaluation" className="block p-2 rounded-md hover:bg-gray-200">Self Evaluation</Link>
                </li>
                <li className="mb-2">
                  <Link href="/direct-reports" className="block p-2 rounded-md hover:bg-gray-200">Direct Reports</Link>
                </li>
                <li className="mb-2">
                  <Link href="/manager-evaluation" className="block p-2 rounded-md hover:bg-gray-200">Manager Evaluation</Link>
                </li>
              </ul>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
