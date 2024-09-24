import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Image 
            src="/kenzen.png"
            width={94}
            height={27}
            className="hidden md:block"
            alt="Kenzen App Logo"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#caracteristicas">
            Características
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Acerca de
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contacto
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/join-as-gym">
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
                <Link href="/athlete-signup" className="w-full">
                  <Button size="lg">Registrarse</Button>
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Al registrarte, aceptas nuestros términos y condiciones.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="caracteristicas">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Cómo funciona</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <Card className="flex flex-col min-h-[250px]">
                <CardHeader>
                  <CardTitle>Regístrate en la plataforma</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Crea tu cuenta personalizada utilizando el código único que te proporcionará tu gimnasio.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col min-h-[250px]">
                <CardHeader>
                  <CardTitle>Recibe tu plan de rehabilitación</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Tu gimnasio te asignará un programa predefinido según tu lesión.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col min-h-[250px]">
                <CardHeader>
                  <CardTitle>Realiza tus ejercicios personalizados</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Accede a tu programa de ejercicios, con videos y guías diseñados para tu recuperación. Sigue tu progreso desde cualquier lugar, en casa, o en tu centro de entrenamiento.</p>
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
              <Link href="/join-as-gym" className="w-full">
                <Button variant="outline" size="lg">Conoce más</Button>
              </Link>
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