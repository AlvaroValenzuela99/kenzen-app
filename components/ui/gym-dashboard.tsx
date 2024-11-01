'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from './select'

export default function GymDashboard() {
  const [athletes, setAthletes] = useState([
    { id: 1, name: "Juan Pérez", program: "Rehabilitación de rodilla" },
    { id: 2, name: "María García", program: "Fortalecimiento de hombro" },
    { id: 3, name: "Carlos Rodríguez", program: "Recuperación de esguince de tobillo" },
  ])

  const [selectedAthlete, setSelectedAthlete] = useState(null)

  const handleProgramChange = (athleteId, newProgram) => {
    setAthletes(athletes.map(athlete =>
      athlete.id === athleteId ? { ...athlete, program: newProgram } : athlete
    ))
  }
  
  return (
    <>   
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Mis Atletas</h1>
        <div className="space-y-4">
          {athletes.map((athlete) => (
            <Card key={athlete.id} className="w-full">
              <CardHeader className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">{athlete.name}</CardTitle>
                    <CardDescription className="text-sm">ID: {athlete.id}</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setSelectedAthlete(athlete)}>Ver detalles</Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Programa actual: <span className="font-medium">{athlete.program}</span></p>
                  <Select onValueChange={(value) => handleProgramChange(athlete.id, value)}>
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
              <SheetTitle>{selectedAthlete.name}</SheetTitle>
              <SheetDescription>Detalles del atleta</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="mb-2">ID: {selectedAthlete.id}</p>
              <p className="mb-2">Programa actual: {selectedAthlete.program}</p>
            </div>
            <Button onClick={() => setSelectedAthlete(null)}>Cerrar</Button>
          </SheetContent>
        </Sheet>
      )}
    </> 
  )
}