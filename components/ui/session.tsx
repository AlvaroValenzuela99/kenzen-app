'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { Exercise } from "@/lib/definitions";
import ExerciseDetails from "@/components/ui/exercise-details";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";


export default function Session({ athleteData, initialExercises }: {
  athleteData: User; 
  initialExercises: Exercise[];
}) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const router = useRouter();

  // Cargar estado desde localStorage al inicio
  useEffect(() => {
    const storedExercises = localStorage.getItem("sessionExercises")
    if (storedExercises) {
      setExercises(JSON.parse(storedExercises));
    } else{
      const exercisesWithCompletion = initialExercises.map(exercise => ({
        ...exercise,
        completed: false // Inicializamos como false si no está definido
      }));
      setExercises(exercisesWithCompletion);
    }
  }, [initialExercises])

  // Guardar estado en localStorage cada vez que cambien los ejercicios
  useEffect(() => {
    if (exercises.length > 0) {
      localStorage.setItem("sessionExercises", JSON.stringify(exercises));
    }
  }, [exercises]);

  // Toggle para marcar/desmarcar un ejercicio como completado
  const toggleExercise = (id: number) => {
    setExercises(exercises.map(exercise => 
      exercise.exercise_id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  // Marcar la sesión como completada
  const completeSession = async (athleteId: string) => {
    try {
      setSessionCompleted(true);
      localStorage.removeItem("sessionExercises"); // Limpiar estado después de completar la sesión
      const response = await fetch('/api/sessionCompleted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          athleteId
        }),
      })

      const result = await response.json()

      if (result.success) {
        console.log('Sesión completada con éxito');
        router.push('/athlete')
        router.refresh()
      }
    } catch (error) {
      console.log('Error inesperado al intentar actualizar la sesión desde la UI')
    }   
  };

  const completedExercises = exercises.filter(exercise => exercise.completed).length
  const progress = (completedExercises / exercises.length) * 100

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Progreso de la Sesión</CardTitle>
          <CardDescription>
            {completedExercises} de {exercises.length} ejercicios completados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
      {exercises.map((exercise) => (
              <Card key={exercise.exercise_id} className={exercise.completed ? 'bg-green-50 dark:bg-green-900' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Checkbox
                      checked={exercise.completed}
                      onCheckedChange={() => toggleExercise(exercise.exercise_id)}
                      className="mr-2"
                    />
                    {exercise.exercise_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Descripción del ejercicio e instrucciones detalladas irían aquí.</p>
                </CardContent>
                <CardFooter>
                  <ExerciseDetails exercise={exercise}></ExerciseDetails>
                </CardFooter>
              </Card>
            ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          size="lg"
          onClick={ () => completeSession(athleteData.id) }
          disabled={completedExercises !== exercises.length || sessionCompleted}
        >
          {sessionCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Sesión Completada
            </>
          ) : (
            'Completar Sesión'
          )}
        </Button>
        </div>
    </div>
  )
}