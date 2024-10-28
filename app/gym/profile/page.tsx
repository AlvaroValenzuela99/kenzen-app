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
        <main>
            <h1 className="mb-4 text-xl md:text-2x1">
                Mi Perfil
            </h1>
        </main>
    )
}