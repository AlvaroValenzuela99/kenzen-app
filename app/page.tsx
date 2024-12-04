import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Users, TrendingUp, CheckCircle, Star, Menu, Activity } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="/">
          <Image 
            src="/kenzen.png"
            width={94}
            height={27}
            className="block"
            alt="Kenzen App Logo"
          />
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Características
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            Cómo funciona
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
            Testimonios
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/join-as-gym">
            Unirme como Gimnasio
          </Link>
          <Button asChild size="sm">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Link href="/" className="flex items-center">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="font-bold ml-2 text-lg">Kenzen</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                href="#features"
              >
                Características
              </Link>
              <Link 
                className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                href="#how-it-works"
              >
                Cómo funciona
              </Link>
              <Link 
                className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                href="#testimonials"
              >
                Testimonios
              </Link>
              <Link 
                className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                href="/join-as-gym"
              >
                Unirme como gimnasio
              </Link>
              <div className="mt-auto pt-4 border-t">
                <Button asChild size="sm" className=" w-full text-md font-medium">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" style={{backgroundImage: 'url("/placeholder.svg?height=600&width=800")'}}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Rehabilitación personalizada para atletas
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Accede a ejercicios específicos para tu lesión y recupera tu forma física de manera segura y eficiente.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/athlete-signup" className="w-full">
                  <Button size="lg">Registrarse</Button>
                </Link>
                <p className="text-xs text-gray-500">
                  Al registrarte, aceptas nuestros términos y condiciones.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"> 
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Características principales</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Planes personalizados</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Recibe un plan de rehabilitación adaptado a tu lesión específica y nivel de condición física.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Seguimiento de progreso</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Monitorea tu avance con métricas detalladas y ajusta tu plan según sea necesario.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Ejercicios guiados</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Accede a videos demostrativos y instrucciones detalladas para cada ejercicio.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Cómo funciona</h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Regístrate en la plataforma</h3>
                  <p>Crea tu cuenta personalizada utilizando el código único que te proporcionará tu gimnasio.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Recibe tu plan de rehabilitación</h3>
                  <p>Tu gimnasio te asignará un programa predefinido según tu lesión</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Realiza tus ejercicios personalizados</h3>
                  <p>Accede a tu programa de ejercicios, con videos y guías diseñados para tu recuperación. Sigue tu progreso desde cualquier lugar, en casa, o en tu centro de entrenamiento.</p>
                </div>
              </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Lo que dicen nuestros usuarios</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <Card>
                <CardHeader>
                  <CardTitle>María G.</CardTitle>
                  <CardDescription>Atleta de CrossFit</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>&quot;Kenzen me ayudó a recuperarme de una lesión de rodilla en tiempo récord. Los ejercicios personalizados fueron clave.&quot;</p>
                </CardContent>
                <CardFooter>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Carlos R.</CardTitle>
                  <CardDescription>Entrenador personal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>&quot;Como entrenador, Kenzen me ha permitido ofrecer un mejor servicio a mis clientes en recuperación. Una herramienta imprescindible.&quot;</p>
                </CardContent>
                <CardFooter>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Kenzen App. Todos los derechos reservados.</p>
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