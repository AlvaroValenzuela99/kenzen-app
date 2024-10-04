'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getGymIdByGymCode } from '@/lib/data'

// Funciones de LOGIN

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// Funciones de SIGNUP

export async function signUpAthlete(formData: FormData) {
  const supabase = createClient()

  const gymCode = formData.get('gym-code') as string
  const email = formData.get('athlete-email') as string
  const password = formData.get('athlete-password') as string
  const firstName = formData.get('first-name') as string
  const lastName = formData.get('last-name') as string

  // Verificar el gymCode antes de continuar
  const gymId = await getGymIdByGymCode(gymCode)

  if (!gymId) {
    return {success: false, error: 'El código de gimnasio no es válido'}
  }

  // Registrar al usuario en Supabase (auth.users)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        gym_code: gymCode,
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    return { success: false, error: 'Error al crear la cuenta. Inténtalo de nuevo.' }
  }

  const userId = data.user?.id

  // Guardar los datos en la tabla athletes
  const athleteData = {
    athlete_id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
    gym_id: gymId,
  }

  // Insertar en la tabla athletes
  const { error: insertError } = await supabase
    .from('athletes')
    .insert(athleteData)

  if (insertError) {
    return { success: false, error: 'Error al guardar los datos del atleta. Inténtalo de nuevo.' }
  }

  return { success: true }
}

export async function signUpGym(formdata: FormData) {
  const supabase = createClient()
}

// Funcion de SIGNOUT

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}