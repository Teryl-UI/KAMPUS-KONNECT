import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarqueeTicker from "@/components/brand/MarqueeTicker";

export const metadata: Metadata = {
  title: "KAMPUS KONNECT — Connect. Collaborate. Thrive.",
  description: "A bold, energetic student community platform to discover campus activities, connect with students, find collaborators, share projects, and thrive together.",
  keywords: ["Kampus Konnect", "Student Community", "Campus Events", "Find Teammates", "Student Projects", "Campus Gists", "FUOYE"],
  openGraph: {
    title: "KAMPUS KONNECT — Connect. Collaborate. Thrive.",
    description: "The official student community and collaboration network.",
    siteName: "Kampus Konnect",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Space+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-warm-white)] text-[var(--color-ink)] font-body antialiased selection:bg-[var(--color-yellow)] selection:text-[var(--color-ink)]">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-purple)] focus:text-white focus:rounded-md font-meta text-xs"
        >
          Skip to main content
        </a>

        {/* Global Live Ticker */}
        <MarqueeTicker />

        {/* Brand Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Brand Footer */}
        <Footer />
      </body>
    </html>
  );
}
