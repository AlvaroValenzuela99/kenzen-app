import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";

export default function LoginForm() {
  return (
    <form action={login}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Inicia Sesión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="tu@email.com" type="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" placeholder="contraseña" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Iniciar Sesión</Button>
        </CardFooter>
      </Card>
    </form>
  )
}