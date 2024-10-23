import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } =  await supabase.auth.getUser()

  if (error || !data?.user || data?.user?.user_metadata?.role != 'gym') {
    console.log('El usuario no es atleta')
    redirect('/login')
  }

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2x1">
                Bienvenido al panel de administración de tu gimnasio
            </h1>
        </main>
    )
}