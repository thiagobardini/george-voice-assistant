import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "George AI - Voice-Activated Scheduling Assistant",
  description: "Experience seamless voice-powered appointment scheduling with George AI. Our intelligent assistant integrates with Calendly to manage your bookings using natural conversation. Try the future of meeting scheduling today!",
  keywords: [
    "AI scheduling assistant",
    "voice-activated booking",
    "Calendly integration",
    "voice AI technology",
    "meeting scheduler",
    "smart calendar management"
  ],
  openGraph: {
    title: "George AI - Voice-Powered Scheduling Assistant",
    description: "Revolutionize your scheduling workflow with natural voice commands. George AI handles appointments, reminders and calendar management through conversational AI.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "George AI Voice Assistant Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "George AI - Smart Voice Scheduling",
    description: "Book meetings naturally with voice commands. AI-powered Calendly integration for modern professionals.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/george-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
