import { fetchCurrentSession } from "@/lib/data";
import Session from "@/components/ui/session";
import { revalidatePath } from 'next/cache';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'athlete') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

  const currentSession = await fetchCurrentSession(data.user.id);
  const exercises = currentSession?.exercises ?? [];

  revalidatePath('/athlete/session')

  return (
    <main>
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Tu sesión de hoy:</h1>
        <Session athleteData={data?.user} initialExercises={exercises}/>
      </div>
    </main>
  )
}