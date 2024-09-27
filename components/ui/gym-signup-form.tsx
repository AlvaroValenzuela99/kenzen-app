import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GymSignup() {
  return (
    <>
      <form>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Registro de Gimnasio</CardTitle>
            <CardDescription>Completa el formulario para unirte a Kenzen App</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="gym-name">Nombre del gimnasio</Label>
              <Input id="gym-name" placeholder="Ingresa el nombre de tu gimnasio" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="gym-email">Email</Label>
              <Input id="gym-email" placeholder="tu@gimnasio.com" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="gym-password">Contraseña</Label>
              <Input id="gym-password" placeholder="Contraseña" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="gym-confirmPassword">Confirmar contraseña</Label>
              <Input id="gym-confirmPassword" placeholder="Confirmar contraseña" type="password"/>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/gym" className="w-full">
              <Button className="w-full">Registrarse como Gimnasio</Button>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}