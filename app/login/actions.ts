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

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get('athlete-email') as string,
    password: formData.get('athlete-password') as string,
    options: {
      data: {
        gym_code: gymCode,
        first_name: formData.get('first-name') as string,
        last_name: formData.get('last-name') as string,
      }
    }
  }

  const { data, error } = await supabase.auth.signUp(userData)

  if (error) {
    redirect('/error')
  }

  const userId = data.user?.id

  // Obtener el id del gimnasio por código de gimnasio introducido
  const gymId = await getGymIdByGymCode(gymCode)
  
  const athleteData = {
    athlete_id: userId,
    email: formData.get('athlete_email') as string,
    first_name: formData.get('first-name') as string,
    last_name: formData.get('last-name') as string,
    gym_id: gymId,
  }

  // Insertar en la tabla athletes
  const { error: insertError } = await supabase
    .from('athletes')
    .insert(athleteData)

  //if (insertError) {
    // Opcional: Eliminar el usuario creado si falla la insercion
    //await supabase.auth.admin.deleteUser(userId)
    //redirect('/error')
  //}
  
  revalidatePath('/', 'layout')
  redirect('/')
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