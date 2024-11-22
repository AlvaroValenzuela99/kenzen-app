import { Activity, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";
import Link from "next/link";
import { signOut } from "@/lib/actions";

export default function AthleteSideNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden absolute top-2 left-4">
          <Menu className="h-6 w-6"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Link href="/athlete" className="flex items-center space-x-2 text-xl font-bold">
              <Activity className="h-6 w-6" />
              <span>Kenzen</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 pt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/athlete" className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-900">
                <span>Sesiones</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-900">
                <span>Perfil</span>
              </Link>
            </li>
          </ul>
        </nav>
        <form action={signOut} className="mt-auto">
          <button type="submit" className="w-full flex items-center space-x-2 hover:bg-red-600 hover:text-white p-2 rounded-lg">
            <LogOut />
            <span>Cerrar sesión</span>
          </button>
        </form>
      </SheetContent>
    </Sheet>
  )
}