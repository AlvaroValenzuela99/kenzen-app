import Link from "next/link";
import Image from 'next/image';
import { signOut } from "../../lib/actions";
import AthleteSideNav from "@/components/ui/athlete-sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="hidden px-4 lg:px-6 h-14 md:flex items-center border-b">
        <Link className="flex items-center justify-center" href="/athlete">
          <Image 
            src="/kenzen.png"
            width={94}
            height={27}
            className="hidden md:block"
            alt="Kenzen App Logo"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/athlete">
            Sesiones
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Perfil
          </Link>
          {/* Formulario que invoca la acción de cierre de sesión */}
          <form action={signOut} className="flex items-center">
            <button type="submit" className="text-sm font-medium hover:underline underline-offset-4">
              Cerrar sesión
            </button>
          </form>
        </nav>
      </header>
      <div className="flex flex-1">
        <AthleteSideNav />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto pt-14 px-4 py-8 md:py-12 lg:py-16">
            {children}
          </div>
        </main>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Kenzen App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}