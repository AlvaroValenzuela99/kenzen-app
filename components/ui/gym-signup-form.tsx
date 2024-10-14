'use client'

import { useState, FormEvent, useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpGym } from '@/lib/actions';

export default function GymSignup() {
const [formError, setFormError] = useState('')
const [isPending, startTransition] = useTransition()
const router = useRouter()

// Manejar el envío del formulario
const handleSubmit = (e: FormEvent) => {
  e.preventDefault()
  setFormError('') // Resetear el error antes de enviar el formulario

  const formData = new FormData(e.currentTarget as HTMLFormElement)

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    setFormError('Las contraseñas no coinciden.')
    return
  }

  // Eliminar el campo confirmPassword ya que no es necesario en el servidor
  formData.delete('confirmPassword')
  
  // Usar la acción del servidor
  startTransition(async () => {
    const result = await signUpGym(formData)

    if(!result.success) {
      setFormError(result.error as string) // Mostrar el mensaje de error en caso de fallo
      return
    }

    // Redirigir en caso de éxito
    router.push('/') // Redirigir al usuario a la página principal
  })
}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Registro de Gimnasio</CardTitle>
            <CardDescription>Completa el formulario para unirte a Kenzen App</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="gym-name">Nombre del gimnasio</Label>
              <Input id="gym-name" name="gym-name" placeholder="Ingresa el nombre de tu gimnasio" type="text" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="tu@gimnasio.com" type="email" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" placeholder="Contraseña" type="password" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña" type="password" required />
            </div>
            {/* Mostrar mensaje de error si lo hay */}
            {formError && <p className="text-sm text-red-500">{formError}</p>}            
          </CardContent>
          <CardFooter>           
            <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrarse como Gimnasio'}
            </Button>     
          </CardFooter>
        </Card>
      </form>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Al registrarte, aceptas nuestros términos y condiciones.
      </p>
    </>
  )
}