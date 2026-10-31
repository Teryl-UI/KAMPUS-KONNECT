import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoDisclaimer from "@/components/layout/DemoDisclaimer";

export const metadata: Metadata = {
  title: "Campus Connect | FUOYE Student Collaboration Platform",
  description: "Discover campus events, find teammates for hackathons and projects, and showcase student innovation across Federal University Oye-Ekiti (FUOYE).",
  keywords: ["FUOYE", "Federal University Oye-Ekiti", "Campus Connect", "Student Projects", "Campus Events", "Nigeria Students"],
  openGraph: {
    title: "Campus Connect FUOYE",
    description: "Collaborative student platform uniting Oye and Ikole campuses.",
    siteName: "Campus Connect FUOYE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        {/* Demo Disclaimer Banner */}
        <DemoDisclaimer />

        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
