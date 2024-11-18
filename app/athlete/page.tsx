import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchProgram, fetchCurrentSession, fetchAthleteInfo, getProgramProgress } from "@/lib/data";
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PartyPopper } from "lucide-react";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'athlete') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

  //Obtener nombre del programa
  const programName = await fetchProgram(data.user.id)

  //Obtener datos de la sesión actual
  const currentSession = await fetchCurrentSession(data.user.id)
  const exercises = currentSession?.exercises;

  //Obtener datos del atleta
  const { first_name } = await fetchAthleteInfo(data.user.id)

  //Obtener número de sesión actual y sesiones totales del programa
  const programProgress = await getProgramProgress(data.user.id)

  // Sesiones completadas: si está completado, igual a totalSessions
  const completedSessions = programProgress?.programCompleted
    ? programProgress?.totalSessions
    : programProgress?.currentSessionNumber - 1;

  // Progreso en porcentaje: si está completado, directamente 100%
  const progressPercentage = programProgress?.programCompleted
    ? 100
    : (completedSessions * 100) / programProgress?.totalSessions;

  revalidatePath('/athlete')

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido, {first_name}</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {programProgress?.programCompleted ? (
                  <div className="bg-green-200 rounded-2xl p-2 text-center flex items-center justify-center">
                    <PartyPopper className="mr-2 h-6 w-6" /> ¡Felicidades! Has completado tu programa.
                  </div>
                ) : (
                  <>
                    Próxima sesión de: <span className="text-cyan-500">{programName?.program_name}</span>
                  </>
                )}
              </CardTitle>
              {!programProgress?.programCompleted && (
                <CardDescription>Ejercicios para hoy</CardDescription>
              )}
            </CardHeader>
            {programProgress?.programCompleted ? (
              <CardContent className="md:pl-20">
                <p>¡Enhorabuena! Has completado todas las sesiones de tu programa de rehabilitación.</p>
                <p>Consulta con tu entrenador para recibir nuevas recomendaciones.</p>
              </CardContent>
            ) : (
              <>
                <CardContent className="pb-2">
                  <p>{currentSession?.session_name}</p>
                </CardContent>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    {exercises?.map((exercise: any, index: number) => (
                      <li key={index}>{exercise.exercise_name}</li>
                    ))}
                  </ul>
                </CardContent>
              </>
            )}
            <CardFooter>
              {!programProgress?.programCompleted && (
                <Link href="/athlete/session">
                  <Button>Comenzar sesión</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tu progreso</CardTitle>
              <CardDescription>
                Has completado { completedSessions } de { programProgress?.totalSessions } sesiones
                {programProgress?.programCompleted ? '. ¡Enhorabuena!' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
