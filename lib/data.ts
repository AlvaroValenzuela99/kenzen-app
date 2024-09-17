import { sql } from '@vercel/postgres';
import { Exercise, ProgramName, SessionData } from './definitions'

// Devuelve el programa que tiene asignado el atleta a través de la tabla athlete_programs
export async function fetchProgram(id: number): Promise<ProgramName | undefined> {
  try {
    // Obtener el program_id correspondiente al atleta
    const athleteProgram = await sql`SELECT program_id FROM athlete_programs
                            WHERE athlete_id = ${id}`;

    const programId = athleteProgram.rows[0].program_id;

    // Obtener el programa actual del atleta
    const returnedProgram = await sql<ProgramName> `SELECT program_name FROM programs
                                                    WHERE program_id = ${programId}`;
    return returnedProgram.rows[0];
  } catch (error) {
    console.log('Error recuperando el programa asignado al atleta:',error);
    return undefined;
  }
}

// Busca la sesión que tiene en curso a partir de athlete_programs, y devuelve el nombre de la sesión y los ejercicios correspondientes
export async function fetchCurrentSession(id: number): Promise<SessionData | undefined> {
  try {
    // Obtener el programa y la sesión actual del atleta
    const currentProgram = await sql`SELECT program_id, current_session FROM athlete_programs
                                      WHERE athlete_programs_id = ${id}`;

    const programId = currentProgram.rows[0].program_id;
    const sessionNumber = currentProgram.rows[0].current_session;
 
    // Obtener el session_id correspondiente al programa y número de sesión actual
    const sessionInfo = await sql`SELECT session_id, session_name FROM sessions
                                  WHERE program_id = ${programId}
                                  AND session_number = ${sessionNumber}`;

    const sessionID = sessionInfo.rows[0].session_id;

    // Obtener los ejercicios correspondientes a la sesión actual
    const exercisesQuery = await sql`SELECT e.exercise_id, e.exercise_name, e.description, e.objective, e.reps, e.sets, e.equipment, e.video_url
                                  FROM exercises e
                                  JOIN session_exercises se ON e.exercise_id = se.exercise_id
                                  WHERE se.session_id = ${sessionID}`;

    // Mapea el resultado al tipo Exercise, añadiendo la propiedad 'completed' como false
    const exercises: Exercise[] = exercisesQuery.rows.map((row: any) => ({
      exercise_id: row.exercise_id,
      exercise_name: row.exercise_name,
      description: row.description,
      objective: row.objective,
      reps: row.reps,
      sets: row.sets,
      equipment: row.equipment,
      video_url: row.video_url,
      completed: false // Añade el campo `completed` aquí con el valor por defecto `false`
    }));

    return {
      session_name: sessionInfo.rows[0].session_name,
      exercises: exercises
    };
  } catch (error) {
    console.log('Error recuperando la sesión actual:',error);
    return undefined;
  }
}