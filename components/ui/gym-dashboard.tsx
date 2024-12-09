'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from './select'
import { AthleteWithProgram, Program } from '@/lib/definitions'
import { User } from '@supabase/supabase-js'
import { Progress } from './progress'
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
import { Badge } from './badge'

export default function GymDashboard({gymData, athletes, allPrograms} : {
  gymData: User; 
  athletes: AthleteWithProgram[] | null;
  allPrograms: Program[] | null;
}) {

  const [selectedAthlete, setSelectedAthlete] = useState<AthleteWithProgram | null>(null)
  const [athleteList, setAthleteList] = useState<AthleteWithProgram[] | null>(athletes)

  const handleProgramChange = async (athleteId: string, newProgramId: number) => {
    try {
      const response = await fetch('/api/assignProgram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          athleteId, 
          programId: newProgramId
        }),
      })

      const result = await response.json()

      if (result.success) {
        //Si se asigna exitosamente el programa, actualiza el estado del componente
        setAthleteList((prevList) =>
          prevList
            ? prevList.map((athlete) =>
              athlete.athlete_id === athleteId
              ? { 
                ...athlete, 
                program: {program_name: result.program.program_name},
                progress: result.progress
              }
              : athlete
            )
            : null
        )
      }
    } catch (error) {
      console.log('Error inesperado al intentar actualizar el programa del atleta desde la UI')
    }
  }
  
  return (
    <>   
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mt-10 md:mt-0 mb-6">Mis Atletas</h1>
        <div className="space-y-4">
          {athleteList?.map((athlete) => (
            <Card key={athlete.athlete_id} className="w-full">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{`${athlete.first_name} ${athlete.last_name}`}</CardTitle>
                    <CardDescription>
                      {athlete.program?.program_name || 'No asignado'}
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setSelectedAthlete(athlete)}>Ver detalles</Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">Progreso del programa:</p>
                    <div className="flex items-center">
                      <Progress value={athlete?.progress?.progressPercentage || 0} className="flex-grow mr-2" />
                      <span className="text-sm font-medium">{athlete?.progress?.progressPercentage || 0}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Última sesión completada:</p>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      <span>
                        {athlete?.progress?.lastSession ? new Date(athlete?.progress?.lastSession).toLocaleDateString() : 'No hay sesiones' }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={athlete?.progress?.programCompleted ? "outline" : "secondary"} className="flex items-center">
                    {athlete?.progress?.programCompleted ? (
                      <>
                        <CheckCircleIcon className="mr-1 h-4 w-4" />
                        Completado
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="mr-1 h-4 w-4" />
                        En progreso
                      </>
                    )}
                  </Badge>
                  <Select onValueChange={(value) => handleProgramChange(athlete.athlete_id, parseInt(value))}>
                    <SelectTrigger className="md:w-[200px]">
                      <SelectValue placeholder="Cambiar programa" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPrograms?.map((program) => (
                        <SelectItem key={program.program_id} value={program.program_id.toString()}>{program.program_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Athlete details modal */}
      {selectedAthlete && (
        <Sheet open={!!selectedAthlete} onOpenChange={() => setSelectedAthlete(null)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{`${selectedAthlete.first_name} ${selectedAthlete.last_name}`}</SheetTitle>
              <SheetDescription>Detalles del atleta</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="mb-2">Programa actual: {selectedAthlete.program?.program_name || 'No asignado'}</p>
              <p className="mb-2">
                Progreso del programa:&nbsp;
                {selectedAthlete?.progress ? (
                  <>
                    {selectedAthlete.progress.programCompleted
                      ? 100
                      : ((selectedAthlete.progress.currentSessionNumber - 1) * 100) / selectedAthlete.progress.totalSessions || 0}%
                  </>
                ) : 'No hay progreso disponible'}
              </p>
              <p className="mb-2">Última sesión completada: {selectedAthlete.progress?.lastSession ? new Date(selectedAthlete?.progress?.lastSession).toLocaleDateString() : 'No hay sesiones'}</p>
              <Progress value={selectedAthlete?.progress ? (selectedAthlete.progress.programCompleted
                ? 100
                : ((selectedAthlete.progress.currentSessionNumber - 1) * 100) / selectedAthlete.progress.totalSessions || 0) : 0 } />
            </div>
            <Button onClick={() => setSelectedAthlete(null)}>Cerrar</Button>
          </SheetContent>
        </Sheet>
      )}
    </> 
  )
}