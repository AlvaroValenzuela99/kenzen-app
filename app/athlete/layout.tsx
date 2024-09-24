import Link from "next/link";
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
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
        </nav>
      </header>
      <div className="flex-1 py-12 md:py-24 lg:py-32">{children}</div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Kenzen App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}