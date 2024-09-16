import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchProgram, fetchCurrentSession } from "@/lib/data";

export default async function Page() {

  // ID ficticio y hardcodeado, solo para desarrollo inicial
  const programName = await fetchProgram(1);

  const currentSession = await fetchCurrentSession(1);
  const exercises = currentSession?.exercises;

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido, Atleta</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Próxima sesión de {programName?.program_name}</CardTitle>
              <CardDescription>Ejercicios para hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{currentSession?.session_name}</p>
            </CardContent>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                {exercises?.map((exercise:any, index:number) => (
                  <li key={index}>{exercise.exercise_name}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/athlete/session">
                <Button>Comenzar sesión</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tu progreso</CardTitle>
              <CardDescription>Has completado 0 de 10 sesiones</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={0} className="w-full" />
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  )
}
