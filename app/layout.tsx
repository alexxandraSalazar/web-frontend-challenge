import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Frontend Challenge",
  description: "Web Frontend Challenge for frontend developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
