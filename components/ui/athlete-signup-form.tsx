'use client'

import { useState, FormEvent, useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAthlete } from "@/app/login/actions";

export default function AthleteSignup() {
  const [formError, setFormError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormError('') // Resetear el error antes de enviar el formulario

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    // Usar la acción del servidor
    startTransition(async () => {
      const result = await signUpAthlete(formData)

      if (!result.success) {
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
                <CardTitle>Registro de Atleta</CardTitle>
                <CardDescription>Ingresa tus datos para comenzar tu rehabilitación.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="gym-code">Código del gimnasio</Label>
                  <Input id="gym-code" placeholder="Ingresa el código de tu gimnasio" type="text"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" placeholder="Nombre" type="text"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last-name">Apellidos</Label>
                  <Input id="last-name" placeholder="Apellidos" type="text"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="athlete-email">Email</Label>
                  <Input id="athlete-email" placeholder="tu@email.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="athlete-password">Contraseña</Label>
                  <Input id="athlete-password" placeholder="Contraseña" type="password" />
                </div>
                <div>
                  <Label htmlFor="athlete-confirmPassword">Confirmar contraseña</Label>
                  <Input id="athlete-confirmPassword" placeholder="Confirmar contraseña" type="password" />
                </div>
                {/* Mostrar mensaje de error si lo hay */}
                {formError && <p className="text-sm text-red-500">{formError}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Registrando...' : 'Registrarse como Atleta'}
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