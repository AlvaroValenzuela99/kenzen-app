import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import MyGymMenu from "@/components/ui/my-gym-menu";

export default async function PrivatePage() {

  const supabase = await createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'gym') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Mi Gimnasio</h1>
        <MyGymMenu />
    </div>
    )
}