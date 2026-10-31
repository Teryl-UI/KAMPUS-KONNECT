import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Connect FUOYE | Hacktoberfest Student Collaboration",
  description: "Discover campus events, find hackathon teammates, share student projects, and collaborate across Oye and Ikole campuses with Google Gemma AI.",
  keywords: ["FUOYE", "Federal University Oye-Ekiti", "Hacktoberfest", "Gemma AI", "Student Collaboration", "Open Source Nigeria"],
  openGraph: {
    title: "Campus Connect FUOYE",
    description: "Discover campus events, find teammates, and collaborate across FUOYE campuses powered by Gemma AI.",
    siteName: "Campus Connect",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

