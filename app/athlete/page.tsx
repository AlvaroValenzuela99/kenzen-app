import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <MedicalIcon className="h-6 w-6" />
          <span className="sr-only">GymRehab</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Ejercicios
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Progreso
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Perfil
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Bienvenido, Atleta</h1>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tu progreso</CardTitle>
                <CardDescription>Has completado 3 de 10 sesiones</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={30} className="w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Próxima sesión</CardTitle>
                <CardDescription>Ejercicios para hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Estiramiento de isquiotibiales</li>
                  <li>Fortalecimiento de cuádriceps</li>
                  <li>Ejercicios de equilibrio</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Comenzar sesión</Button>
              </CardFooter>
            </Card>
          </div>
          <h2 className="text-2xl font-bold mt-12 mb-4">Ejercicios recomendados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {['Estiramiento de cadera', 'Fortalecimiento de core', 'Movilidad de tobillo'].map((exercise) => (
              <Card key={exercise}>
                <CardHeader>
                  <CardTitle>{exercise}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Descripción breve del ejercicio y sus beneficios.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Ver detalles</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 GymRehab. Todos los derechos reservados.</p>
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