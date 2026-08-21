import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteTitle = "Abdullah Harits — Full-Stack Software Engineer";
const siteDescription =
  "Full-stack engineer with 5+ years of experience building web & mobile applications, WhatsApp chatbots, and event-driven microservices — Next.js, Go, Flutter.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://harits19.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://harits19.github.io",
    siteName: "Abdullah Harits",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Harits — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdullah Harits",
  jobTitle: "Full-Stack Software Engineer",
  url: "https://harits19.github.io",
  email: "mailto:harits.abdullah19@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/abd-harits",
    "https://github.com/Harits19",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "Go",
    "Flutter",
    "React Native",
    "Microservices",
    "Event-Driven Architecture",
    "WhatsApp Business API",
    "Google Cloud Platform",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen w-full">
      <body
        className={`${inter.variable} w-full min-h-screen bg-gray-100 transition-colors duration-500`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
