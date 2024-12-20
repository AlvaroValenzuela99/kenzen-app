import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchProgram, fetchCurrentSession, fetchAthleteInfo, getProgramProgress } from "@/lib/data";
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CheckCircle, PartyPopper } from "lucide-react";
import MotivationalMessage from "@/components/ui/motivational-message";


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

  const completedSessions = programProgress?.completedSessions ?? 0;
  const progressPercentage = programProgress?.progressPercentage ?? 0;

  revalidatePath('/athlete')

  return (
    <div className="container mx-auto px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido, {first_name}</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>
              {programProgress?.programCompleted ? (
                <div className="bg-green-100 text-green-800 rounded-lg p-2 text-center flex items-center justify-center">
                  <PartyPopper className="mr-2 h-5 w-5" /> ¡Felicidades! Has completado tu programa.
                </div>
              ) : (
                <>
                  Próxima sesión de: <span className="text-blue-600">{programName?.program_name}</span>
                </>
              )}
            </CardTitle>
            {!programProgress?.programCompleted && (
              <CardDescription>Ejercicios para hoy</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {programProgress?.programCompleted ? (
              <div className="text-center">
                <p>¡Enhorabuena! Has completado todas las sesiones de tu programa de rehabilitación.</p>
                <p>Consulta con tu entrenador para recibir nuevas recomendaciones.</p>
              </div>
            ) : (
              <>
                <p className="font-medium text-lg mb-4">{currentSession?.session_name}</p>
                <div className="space-y-2">
                  {exercises?.map((exercise: any, index: number) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                      <span className="text-gray-700">{exercise.exercise_name}</span>
                    </li>
                  ))}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            {!programProgress?.programCompleted && (
              <Link href="/athlete/session">
                <Button>Comenzar sesión</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
        <Card className="shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Tu progreso</CardTitle>
            <CardDescription>
              Has completado { completedSessions } de { programProgress?.totalSessions } sesiones
              {programProgress?.programCompleted ? '. ¡Enhorabuena!' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Progress value={progressPercentage} className="w-full" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Progreso</span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
          </CardContent>
          <CardFooter className="bg-blue-50 border-t border-blue-200 mt-auto flex items-center justify-center p-4">
            <MotivationalMessage />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
