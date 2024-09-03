import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MedicalIcon className="h-6 w-6" />
          <span className="sr-only">Kenzen App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Características
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Precios
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Acerca de
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contacto
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#gym-register">
            Unirme como Gimnasio
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 justify-center place-content-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Rehabilitación personalizada para atletas
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Accede a ejercicios específicos para tu lesión y recupera tu forma física de manera segura y eficiente.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button>
                  <Link href="/athlete-signup">Registrarse</Link>
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Al registrarte, aceptas nuestros términos y condiciones.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Cómo funciona</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <Card>
                <CardHeader>
                  <CardTitle>1. Regístrate con tu gimnasio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Usa el código proporcionado por tu gimnasio para crear una cuenta personalizada.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2. Describe tu lesión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Proporciona detalles sobre tu lesión para recibir un plan de rehabilitación adaptado.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>3. Accede a ejercicios personalizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Obtén acceso a una biblioteca de ejercicios diseñados específicamente para tu recuperación.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="gym-register" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Registro para Gimnasios
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Únete a nuestra plataforma y ofrece rehabilitación personalizada a tus atletas.
                </p>
              </div>
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Registra tu gimnasio</CardTitle>
                  <CardDescription>Completa el formulario para comenzar</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Input id="name" placeholder="Nombre del gimnasio" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Input id="email" placeholder="Email" type="email" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Registrar Gimnasio</Button>
                </CardFooter>
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