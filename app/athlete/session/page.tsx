import { fetchCurrentSession } from "@/lib/data";
import Session from "@/components/ui/session";
import { revalidatePath } from 'next/cache';

export default async function Page() {

  const currentSession = await fetchCurrentSession(1);
  const exercises = currentSession?.exercises ?? [];

  revalidatePath('/athlete')

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Tu sesión de hoy:</h1>
        <Session initialExercises={exercises}/>
      </div>
    </main>
  )
}