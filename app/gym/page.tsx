import GymDashboard from "@/components/ui/gym-dashboard";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'gym') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

    return (
      <>
        <GymDashboard />
      </>
    )
}