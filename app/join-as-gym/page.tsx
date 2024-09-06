import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="/">
            <MedicalIcon className="h-6 w-6" />
            <span className="sr-only">Kenzen App</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Inicio
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Características
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Precios
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Únete a Kenzen App como Gimnasio
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Ofrece rehabilitación personalizada a tus atletas y destaca tu gimnasio con nuestra plataforma innovadora.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Link href="/gym-signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">Registrar mi gimnasio</Button>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Al registrarte, aceptas nuestros términos y condiciones.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Características</h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Rehabilitación Personalizada</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Ofrece planes de rehabilitación adaptados a las necesidades específicas de cada atleta.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Gestión de Atletas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Administra fácilmente a tus atletas, sus lesiones y su progreso en la plataforma.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Seguimiento de Progreso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Monitorea el avance de tus atletas y ajusta sus planes de rehabilitación en tiempo real.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Planes y Precios</h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Básico</CardTitle>
                    <p>Para gimnasios pequeños</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">Gratis</div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">Hasta 5 atletas</li>
                      <li className="flex items-center">Biblioteca básica de ejercicios</li>
                      <li className="flex items-center">Soporte por email</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Pro</CardTitle>
                    <p>Para gimnasios medianos y grandes</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">$50/mes</div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">Atletas ilimitados</li>
                      <li className="flex items-center">Biblioteca completa de ejercicios</li>
                      <li className="flex items-center">Soporte prioritario 24/7</li>
                      <li className="flex items-center">Análisis avanzados</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Kenzen App. Todos los derechos reservados.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Términos de servicio
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacidad
            </Link>
          </nav>
        </footer>
      </div>
    )
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