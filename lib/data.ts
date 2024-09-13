import { sql } from '@vercel/postgres';
import { ProgramName, Session } from './definitions'

// Devuelve el programa que tiene asignado el atleta a través de la tabla athlete_programs
export async function fetchProgram(id: number): Promise<ProgramName | undefined> {
  try {

    const athleteProgram = await sql`SELECT program_id FROM athlete_programs
                            WHERE athlete_id = ${id}`;

    const returnedProgram = await sql<ProgramName> `SELECT program_name FROM programs
                                                    WHERE program_id = ${athleteProgram.rows[0].program_id}`;
    return returnedProgram.rows[0];
  } catch (error) {
    console.log('Error recuperando el programa asignado al atleta:',error);
    return undefined;
  }
}

// Va a recibir como parámetro el athlete_program_id que se recibe
// Busca la sesión que tiene en curso a partir de athlete_programs
// FALTA DEFINIR LOS TIPOS!
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