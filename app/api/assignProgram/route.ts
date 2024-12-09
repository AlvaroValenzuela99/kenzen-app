import { assignOrUpdateProgramToAthlete, getProgramProgress } from "@/lib/data"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { athleteId, programId } = await req.json()

    if (!athleteId || !programId) {
      return NextResponse.json({ success: false, message: 'Faltan datos' }, { status: 400 })
    }

    const updatedProgram = await assignOrUpdateProgramToAthlete(athleteId, programId)

    // Una vez actualizado el programa, devolvemos el progreso del nuevo programa
    const newProgramProgress = await getProgramProgress(athleteId)

    if (updatedProgram && newProgramProgress) {
      return NextResponse.json({ success: true, program: updatedProgram, progress: newProgramProgress })
    } else {
      return NextResponse.json({ success: false, message: 'Error al asignar o actualizar el programa' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error en la ruta POST para asignar programa:', error);
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 });
  }
}