import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AthleteSignup() {
    return (
        <>
          <form>
            <Card>
              <CardHeader>
                <CardTitle>Registro de Atleta</CardTitle>
                <CardDescription>Ingresa tus datos para comenzar tu rehabilitación.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="gym-code">Código del gimnasio</Label>
                  <Input id="gym-code" placeholder="Ingresa el código de tu gimnasio" type="text"/>
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
              </CardContent>
              <CardFooter>
                <Link href="/athlete" className="w-full">
                    <Button className="w-full">Registrarse como Atleta</Button>
                </Link>
              </CardFooter>
            </Card>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
              Al registrarte, aceptas nuestros términos y condiciones.
          </p>
        </>
    )
}