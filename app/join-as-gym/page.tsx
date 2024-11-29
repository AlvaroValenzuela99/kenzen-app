import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, CheckCircle, Star, Dumbbell, BarChart, Clock, Menu, Activity } from "lucide-react"
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Page() {
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
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#benefits">
            Beneficios
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">
            Testimonios
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
              Precios
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
                  href="#benefits"
                >
                  Beneficios
                </Link>
                <Link 
                  className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                  href="#testimonials"
                >
                  Testimonios
                </Link>
                <Link 
                  className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                  href="#pricing"
                >
                  Precios
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" style={{backgroundImage: 'url("/placeholder.svg?height=600&width=800")'}}>
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Únete a Kenzen App como Gimnasio
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Ofrece rehabilitación personalizada a tus atletas y destaca tu gimnasio con nuestra plataforma innovadora.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Link href="/gym-signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">Registrar mi gimnasio</Button>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Características para Gimnasios</h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <Users className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Gestión de Atletas</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>Administra fácilmente a tus atletas, sus lesiones y su progreso en la plataforma.</p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Seguimiento de Progreso</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>Monitorea el avance de tus atletas y ajusta sus planes de rehabilitación en tiempo real.</p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <Dumbbell className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Biblioteca de Ejercicios</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>Accede a una amplia biblioteca de ejercicios de rehabilitación con videos e instrucciones detalladas.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Beneficios para tu Gimnasio</h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
                <div className="flex flex-col items-center text-center">
                  <BarChart className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Aumenta tus Ingresos</h3>
                  <p>Ofrece servicios de rehabilitación como un valor agregado y atrae a más clientes.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Fideliza a tus Clientes</h3>
                  <p>Mejora la retención de clientes al proporcionar un servicio integral de fitness y rehabilitación.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Ahorra Tiempo</h3>
                  <p>Automatiza el seguimiento y la planificación de la rehabilitación de tus atletas.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Lo que dicen nuestros gimnasios asociados</h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
                <Card>
                  <CardHeader>
                    <CardTitle>FitZone Gym</CardTitle>
                    <CardDescription>Madrid, España</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>&quot;Kenzen ha transformado la forma en que manejamos la rehabilitación de nuestros atletas. Ha mejorado significativamente la satisfacción de nuestros clientes.&quot;</p>
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
                    <CardTitle>PowerLift Center</CardTitle>
                    <CardDescription>Barcelona, España</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>&quot;La plataforma es intuitiva y fácil de usar. Nos ha permitido ofrecer un servicio más profesional y personalizado a nuestros atletas en recuperación.&quot;</p>
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
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Hasta 5 atletas</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Biblioteca básica de ejercicios</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Soporte por email</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Seleccionar Plan Básico</Button>
                </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Pro</CardTitle>
                    <p>Para gimnasios medianos y grandes</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">$50/mes</div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Atletas ilimitados</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Biblioteca completa de ejercicios</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Soporte prioritario 24/7</li>
                      <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Análisis avanzados</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Seleccionar Plan Pro</Button>
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