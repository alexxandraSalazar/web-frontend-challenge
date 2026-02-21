import { BankProvider } from '@/context/BankProvider';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import LogoComponent from '@/components/icons/LogoComponent';
import ServerGuard from "@/components/ui/ServerGuard";
import { Poppins, Lato, Quicksand } from "next/font/google";
import './globals.css';

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
});
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Tablero', href: '/', iconName: 'dashboard' },
    { label: 'Transferir', href: '/transfer', iconName: 'transfer' },
    { label: 'Pagar', href: '/pay', iconName: 'pay' },
    { label: 'Mis transacciones', href: '/transactions', iconName: 'myTransactions' },
    { label: 'Gestionar', href: '/manage', iconName: 'manage' },
    { label: 'Cheques', href: '/checks', iconName: 'check' },
    { label: 'Paganet', href: '/paynet', iconName: 'paynet' },
    { label: 'Administrar', href: '/administer', iconName: 'myTransactions' },
    { label: 'Ahorro automático', href: '/savings', iconName: 'savings' },
    { label: 'Configuración', href: '/settings', iconName: 'settings' },

  ];

  return (
    <html lang="es" className={`${poppins.variable} ${lato.variable} ${quicksand.variable}`}>
      <body className="font-sans bg-background antialiased">
        <BankProvider>
          <ServerGuard>
            <div className="flex">
              <Sidebar
                logo={<LogoComponent />}
                items={navItems}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <Navbar />
                <main className="lg:ml-70 mt-16 p-4 md:p-8 min-h-screen bg-sidebarBg/30 transition-all duration-300 flex flex-col items-center lg:items-start">
                  <div className="w-full max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </ServerGuard>
        </BankProvider>
      </body>
    </html>
  );
}