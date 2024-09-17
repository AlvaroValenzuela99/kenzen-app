'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, ArrowLeft, CheckCircle } from "lucide-react"
import { Exercise } from "@/lib/definitions";


export default function Session({ initialExercises }: { initialExercises: Exercise[] }) {
  const [exercises, setExercises] = useState(initialExercises);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Toggle para marcar/desmarcar un ejercicio como completado
  const toggleExercise = (id: number) => {
    setExercises(exercises.map(exercise => 
      exercise.exercise_id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  // Marcar la sesión como completada
  const completeSession = () => {
    setSessionCompleted(true);
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
                  <Button variant="outline" className="w-full">Ver detalles</Button>
                </CardFooter>
              </Card>
            ))}
      </div>
      <div className="mt-8 text-center">
        <Button
          size="lg"
          onClick={completeSession}
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