import Link from 'next/link';
import { signOut } from '@/lib/actions';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet'
import { Activity, BarChart, Menu, Settings, Users, LogOut } from 'lucide-react'
import { Button } from './button'

export default function GymSideNav() {
  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4">
          <Link href="/gym" className="flex items-center space-x-2 text-xl font-bold">
            <Activity className="h-6 w-6" />
            <span>Kenzen</span>
          </Link>
        </div>
        <nav className="flex-1 flex-col p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/gym" className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-900">
                <Users className="h-5 w-5" />
                <span>Mis Atletas</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <BarChart className="h-5 w-5" />
                <span>Estadísticas</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </li>
          </ul>
        </nav>
        <form action={signOut} method='post' className='mt-auto p-4'>
          <button type='submit' className='w-full flex items-center space-x-2 hover:bg-red-600 hover:text-white p-2 rounded-lg'>
            <LogOut className='h-5 w-5'/> 
            <span>Cerrar sesión</span>
          </button>
        </form>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 flex flex-col">
          <SheetHeader>
            <SheetTitle>
              <Link href="/gym" className="flex items-center space-x-2 text-xl font-bold">
                <Activity className="h-6 w-6" />
                <span>Kenzen</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 pt-4">
            <ul className="space-y-2">
              <li>
                <Link href="/gym" className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 text-gray-900">
                  <Users className="h-5 w-5" />
                  <span>Mis Atletas</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <BarChart className="h-5 w-5" />
                  <span>Estadísticas</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                  <span>Configuración</span>
                </Link>
              </li>
            </ul>
          </nav>
          <form action={signOut} className='mt-auto'>
            <button type='submit' className='w-full flex items-center space-x-2 hover:bg-red-600 hover:text-white p-2 rounded-lg'>
              <LogOut className='h-5 w-5'/> 
              <span>Cerrar sesión</span>
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}