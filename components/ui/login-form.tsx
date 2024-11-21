'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

export default function LoginForm() {
  const [formError, setFormError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Envío de formulario iniciado') //DEBUG
    setFormError('') // Resetear el error antes de enviar el formulario

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    // Usar la acción del servidor
    startTransition(async () => {
      console.log('Ejecutando login...') //DEBUG
      const result = await login(formData)

      console.log('Resultado de login:', result) //DEBUG
      if (!result?.success) {
        setFormError(result?.error as string) // Mostrar el mensaje de error en caso de fallo
        return
      }

      // Redirigir en caso de éxito al panel que le corresponda (gym | athlete)
      router.push(`/${result?.role}`) 
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Inicia Sesión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="tu@email.com" type="email" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" placeholder="Contraseña" type="password" required />
          </div>
          {/* Mostrar mensaje de error si lo hay */}
          {formError && <p className="text-sm text-red-500">{formError}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}