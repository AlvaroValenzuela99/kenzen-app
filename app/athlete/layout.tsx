import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <MedicalIcon className="h-6 w-6" />
          <span className="sr-only">Kenzen App</span>
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

interface MedicalIconProps extends React.SVGProps<SVGSVGElement> {}

const MedicalIcon: React.FC<MedicalIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 20h8" />
      <path d="M12 4v16" />
      <path d="M20 8h-8" />
      <path d="M8 16h8" />
      <path d="M8 12h8" />
    </svg>
  )
}