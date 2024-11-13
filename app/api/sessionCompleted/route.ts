import { setSessionAsCompleted } from "@/lib/data"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { athleteId } = await req.json()

    if (!athleteId) {
      return NextResponse.json({ success: false, message: 'Faltan datos' }, { status: 400 })
    }

    const updatedSession = await setSessionAsCompleted(athleteId)

    if (updatedSession) {
      return NextResponse.json({ success: true, session: updatedSession })
    } else {
      return NextResponse.json({ success: false, message: 'Error al actualizar la sesión' }, { status: 500 })
    }
  } catch (error) {
    console.log('Error en la ruta POST para actualizar sesión:', error)
    return NextResponse.json({ success: false, message: 'Error interno' }, { status: 500 })
  }
}