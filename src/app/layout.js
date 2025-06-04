import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoreDeskAi - Universal Admin Dashboard | Zero Code API Integration",
  description: "Transform any REST API into a powerful admin dashboard in minutes. CoreDeskAi connects to any data source via URL and token - no coding required.",
  keywords: "admin dashboard, API integration, no-code, data visualization, REST API, business intelligence",
  authors: [{ name: "CoreDeskAi Team" }],
  creator: "CoreDeskAi",
  publisher: "CoreDeskAi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coredeskai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CoreDeskAi - Universal Admin Dashboard",
    description: "Transform any REST API into a powerful admin dashboard in minutes. Zero code required.",
    url: 'https://coredeskai.com',
    siteName: 'CoreDeskAi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CoreDeskAi - Universal Admin Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CoreDeskAi - Universal Admin Dashboard",
    description: "Transform any REST API into a powerful admin dashboard in minutes. Zero code required.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
