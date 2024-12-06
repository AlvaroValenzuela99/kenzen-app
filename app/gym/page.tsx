import GymDashboard from "@/components/ui/gym-dashboard";
import { fetchProgram, getAllPrograms, getMyAthletes, getProgramProgress } from "@/lib/data";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'gym') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

  // Obtener atletas del gimnasio y pasárselo como prop a GymDashboard
  const athletes = await getMyAthletes(data.user.id)

  //Obtener todos los programas de ejercicio y pasárselo como prop a GymDashboard
  const allPrograms = await getAllPrograms()

  //Obtener programas para cada atleta
  const athletesWithPrograms = await Promise.all(
    athletes?.map(async (athlete) => {
      const program = await fetchProgram(athlete.athlete_id)
      const progress = await getProgramProgress(athlete.athlete_id)
      return { ...athlete, program, progress }
    }) || []
  )
    return (
      <>
        <GymDashboard gymData={data?.user} athletes={athletesWithPrograms} allPrograms={allPrograms} />
      </>
    )
}