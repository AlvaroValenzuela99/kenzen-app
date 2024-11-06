'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from './select'
import { AthleteWithProgram, ProgramName } from '@/lib/definitions'
import { User } from '@supabase/supabase-js'

export default function GymDashboard({gymData, athletes} : {gymData: User; athletes: AthleteWithProgram[] | null}) {

  const [selectedAthlete, setSelectedAthlete] = useState<AthleteWithProgram | null>(null)
  const [athleteList, setAthleteList] = useState<AthleteWithProgram[] | null>(athletes)

  const handleProgramChange = (athleteId: string, newProgram: ProgramName) => {
    setAthleteList((prevList) =>
      prevList
        ? prevList.map((athlete) =>
            athlete.athlete_id === athleteId
              ? { ...athlete, program: newProgram }
              : athlete
          )
        : null
    )
  }
  
  return (
    <>   
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Mis Atletas</h1>
        <div className="space-y-4">
          {athleteList?.map((athlete) => (
            <Card key={athlete.athlete_id} className="w-full">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{`${athlete.first_name} ${athlete.last_name}`}</CardTitle>
                    <CardDescription className="text-sm">ID: {athlete.athlete_id}</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setSelectedAthlete(athlete)}>Ver detalles</Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Programa actual: <span className="font-medium">{athlete.program?.program_name || 'No asignado'}</span></p>
                  <Select onValueChange={(value) => handleProgramChange(athlete.athlete_id, { program_name: value } as ProgramName)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Cambiar programa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rehabilitación de rodilla">Rehabilitación de rodilla</SelectItem>
                      <SelectItem value="Fortalecimiento de hombro">Fortalecimiento de hombro</SelectItem>
                      <SelectItem value="Recuperación de esguince de tobillo">Recuperación de esguince de tobillo</SelectItem>
                      <SelectItem value="Rehabilitación de lesión lumbar">Rehabilitación de lesión lumbar</SelectItem>
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
              <p className="mb-2">ID: {selectedAthlete.athlete_id}</p>
              <p className="mb-2">Programa actual: {selectedAthlete.program?.program_name || 'No asignado'}</p>
            </div>
            <Button onClick={() => setSelectedAthlete(null)}>Cerrar</Button>
          </SheetContent>
        </Sheet>
      )}
    </> 
  )
}