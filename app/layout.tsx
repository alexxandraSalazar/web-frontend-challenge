import { BankProvider } from '@/context/BankProvider';
import './globals.css';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans`}>
        <BankProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </BankProvider>
      </body>
    </html>
  );
}