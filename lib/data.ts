import { sql } from '@vercel/postgres';
import { ProgramName, Session } from './definitions'

// Va a recibir el athlete_id y va a devolver el athlete_program_id que tiene asociado
export async function fetchAthleteProgram(id: number) {
  try {
    const data = await sql`SELECT athlete_programs_id FROM athlete_progams
                            WHERE athlete_id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.log('Error recuperando la intersección entre atleta y programa:', error)
  }
}

// Modificarlo para que acepte el athlete_id y de ahí saca el program asignado a través de athlete_programs
export async function fetchProgram(id: number): Promise<ProgramName | undefined> {
  try {
    const data = await sql<ProgramName> `SELECT program_name FROM programs
                                          WHERE program_id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.log('Error recuperando el programa asignado al atleta:',error);
    return undefined;
  }
}

// Va a recibir como parámetro el athlete_program_id que se recibe
// Busca la sesión que tiene en curso a partir de athlete_programs
export async function fetchCurrentSession(id: number) {
  try {
    const currentProgram = await sql`SELECT program_id FROM athlete_programs
                                      WHERE athlete_programs_id = ${id}`
    const currentSession = await sql`SELECT current_session FROM athlete_programs
                                      WHERE athlete_programs_id = ${id}`
    const returnedSession = await sql`SELECT session_name FROM sessions
                                      WHERE program_id = ${currentProgram.rows[0].program_id}
                                      AND session_number = ${currentSession.rows[0].current_session}`

    return returnedSession.rows[0];
  } catch (error) {
    console.log('Error recuperando la sesión actual:',error);
    return undefined;
  }
}