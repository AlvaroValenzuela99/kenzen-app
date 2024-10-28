'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getGymIdByGymCode } from '@/lib/data'

// Funciones de LOGIN

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({email, password})

  if (error || !data.user) {
    console.log(error)
    return {success: false, error: 'Error al iniciar sesión. Usuario no encontrado'}
  }

  // Verificar si el usuario es un atleta
  const { data: athleteData, error: athleteError } = await supabase
    .from('athletes')
    .select('*')
    .eq('athlete_id', data.user.id)
    .single()

  if (athleteData) {
    return {success: true, role: 'athlete'}
  }

  // Verificar si el usuario es un gimnasio
  const { data: gymData, error: gymError } = await supabase
    .from('gyms')
    .select('*')
    .eq('gym_id', data.user.id)
    .single()

  if (gymData) {
    return {success: true, role: 'gym'}
  }

  if (athleteError || gymError) {
    return {success: false, error: 'El usuario no es Atleta ni Gimnasio'}
  }
}

// Funciones de SIGNUP

export async function signUpAthlete(formData: FormData) {
  console.log("signUpAthlete iniciado con formData:", formData) //DEBUG
  const supabase = await createClient()

  const gymCode = formData.get('gym-code') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
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
        gym_id: gymId,
        first_name: firstName,
        last_name: lastName,
        role: 'athlete',
      },
    },
  })

  if (error) {
    console.log('Supabase signUp error: ', error)
    return { success: false, error: 'Error al crear la cuenta del atleta. Inténtalo de nuevo.' }
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
  const { data: insertData, error: insertError } = await supabase
    .from('athletes')
    .insert(athleteData)

  if (insertError) {
    return { success: false, error: 'Error al guardar los datos del atleta. Inténtalo de nuevo.' }
  }

  return { success: true }
}

export async function signUpGym(formData: FormData) {
  const supabase = await createClient()

  const gymName = formData.get('gym-name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const gymCode = gymName?.toLowerCase().replace(/ /g, "-")

  console.log("Valor de gymName: ", gymName); //DEBUG
  console.log("GymCode generado a partir del Gym Name: ", gymCode) //DEBUG

  // Registrar al usuario en Supabase (auth.users)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        gym_name: gymName,
        gym_code: gymCode,
        role: 'gym',
      }
    }
  })

  if (error) {
    return { success: false, error: 'Error al crear la cuenta del gimnasio. Inténtalo de nuevo.' }
  }

  const userId = data.user?.id

  // Guardar los datos en la tabla gyms
  const gymData = {
    gym_id: userId,
    gym_name: gymName,
    email,
    gym_code: gymCode,
  }

  // Insertar en la tabla gyms
  const { data: insertData, error: insertError } = await supabase
  .from('gyms')
  .insert(gymData)

  console.log(insertError)

  if (insertError) {
    return { success: false, error: 'Error al guardar los datos del gimnasio. Inténtalo de nuevo.' }
  }

  return { success: true }
}

// Funcion de SIGNOUT

export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}