import GymDashboard from "@/components/ui/gym-dashboard";
import { fetchProgram, getMyAthletes } from "@/lib/data";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'gym') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

  // Obtener atletas del gimnasio
  const athletes = await getMyAthletes(data.user.id)

  //Obtener programas para cada atleta
  const athletesWithPrograms = await Promise.all(
    athletes?.map(async (athlete) => {
      const program = await fetchProgram(athlete.athlete_id)
      return { ...athlete, program }
    }) || []
  )
    return (
      <>
        <GymDashboard gymData={data?.user} athletes={athletesWithPrograms} />
      </>
    )
}