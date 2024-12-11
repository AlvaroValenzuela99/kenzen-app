import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500">
          © 2024 Kenzen App. Todos los derechos reservados.
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Términos de servicio
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}