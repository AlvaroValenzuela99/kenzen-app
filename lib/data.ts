import { sql } from '@vercel/postgres';
import { ProgramName } from './definitions'

// 
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