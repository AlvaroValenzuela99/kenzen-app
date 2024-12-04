import { Exercise } from "@/lib/definitions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, PlayCircle, Info, CheckCircle } from "lucide-react";

export default function ExerciseDetails({ exercise, onExerciseCompleted }: { 
  exercise: Exercise;
  onExerciseCompleted: (id: number) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Ver detalles</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full h-full md:max-w-[50vw] md:max-h-[95vh] md:h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exercise.exercise_name}</DialogTitle>
          <DialogDescription>Detalles e instrucciones del ejercicio</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Descripción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{exercise.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Dumbbell className="mr-2 h-4 w-4" />
                Series y Repeticiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{exercise.sets} series de {exercise.reps} repeticiones</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="mr-2 h-4 w-4"/>
                Vídeo Demostrativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={exercise.video_url}
                  title={`Video demostrativo de ${exercise.exercise_name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture, web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
            <CardFooter>
              <CardDescription>
                Este vídeo muestra la técnica correcta para realizar el ejercicio.
              </CardDescription>
            </CardFooter>
          </Card>
          <div className="p-4 border-t">
            <Button 
              className="w-full" 
              variant={exercise.completed ? "outline" : "default"}
              onClick={() => onExerciseCompleted(exercise.exercise_id)}
            >
              {exercise.completed ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4"/>
                  Ejercicio completado
                </>
              ) : (
                'Marcar como completado'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}