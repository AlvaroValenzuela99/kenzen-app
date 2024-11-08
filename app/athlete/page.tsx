import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchProgram, fetchCurrentSession, fetchAthleteInfo } from "@/lib/data";
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'athlete') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

  //Obtener nombre del programa
  const programName = await fetchProgram(data.user.id);

  //Obtener datos de la sesión actual
  const currentSession = await fetchCurrentSession(data.user.id);
  const exercises = currentSession?.exercises;

  //Obtener datos del atleta
  const { first_name } = await fetchAthleteInfo(data.user.id)

  revalidatePath('/athlete')

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido, {first_name}</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Próxima sesión de: <span className="text-cyan-500">{programName?.program_name}</span></CardTitle>
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
