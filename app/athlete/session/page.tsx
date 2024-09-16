import { fetchCurrentSession } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {

  const currentSession = await fetchCurrentSession(1);
  const exercises = currentSession?.exercises;

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Tu sesión de hoy:</h1>
        <div className="grid gap-6">
          {exercises?.map((exercise:any, index:number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exercise.exercise_name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}