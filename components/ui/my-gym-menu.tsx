'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useToast } from "@/hooks/use-toast"

const gymSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().min(1, 'La dirección es requerida'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  email: z.string().email('Email inválido'),
  description: z.string().optional(),
  openingHours: z.array(z.object({
    day: z.string(),
    hours: z.string()
  }))
})

type GymFormValues = z.infer<typeof gymSchema>

const initialGymData = {
  name: 'FitZone Gym',
  address: 'Calle Fitness 123, Ciudad Deportiva',
  phone: '123-456-7890',
  email: 'info@fitzonegym.com',
}

const subscriptionData = {
  isActive: true,
  plan: 'Premium',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  price: 199.99,
  billingCycle: 'Mensual',
  features: ['Acceso ilimitado a la plataforma', 'Soporte prioritario', 'Análisis avanzados']
}

export default function MyGymMenu() {
  const [isEditing, setIsEditing] = useState(false)
  const [autoRenew, setAutoRenew] = useState(true)
  const { toast } = useToast()

  const form = useForm<GymFormValues>({
    resolver: zodResolver(gymSchema),
    defaultValues: initialGymData,
  })

  const onSubmit = async (data: GymFormValues) => {
    console.log(data)
    toast({
      title: 'Perfil actualizado',
      description: 'La información de tu gimnasio ha sido actualizada con éxito.',
    })
    setIsEditing(false)
  }

  const handleCancelSubscription = () => {
    toast({
      title: 'Suscripción cancelada',
      description: 'Tu suscripción ha sido cancelada. Seguirá activa hasta el final del período de facturación.',
      variant: 'destructive',
    })
  }

  return (
    <Tabs defaultValue="info" className="space-y-4">
      <TabsList>
        <TabsTrigger value="info">Información General</TabsTrigger>
        <TabsTrigger value="subscription">Suscripción</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>Información del Gimnasio</CardTitle>
            <CardDescription>Gestiona los detalles de tu gimnasio aquí.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    {...form.register('address')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    {...form.register('phone')}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              {isEditing ? (
                <div className="flex space-x-4">
                  <Button type="submit">Guardar cambios</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Editar información
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Detalles de Suscripción</CardTitle>
            <CardDescription>Información sobre tu plan actual y opciones de suscripción.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Plan {subscriptionData.plan}</h3>
                <p className="text-sm text-muted-foreground">
                  {subscriptionData.isActive ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" /> Activo
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle className="w-4 h-4 mr-1" /> Inactivo
                    </span>
                  )}
                </p>
              </div>
              <Badge variant="secondary">{subscriptionData.billingCycle}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Fecha de inicio</p>
                <p className="text-sm text-muted-foreground">{subscriptionData.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Fecha de finalización</p>
                <p className="text-sm text-muted-foreground">{subscriptionData.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Precio</p>
                <p className="text-sm text-muted-foreground">${subscriptionData.price} / mes</p>
              </div>
              <div>
                <p className="text-sm font-medium">Renovación automática</p>
                <Switch
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Características incluidas:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Cancelar suscripción
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}