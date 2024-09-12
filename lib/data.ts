import { sql } from '@vercel/postgres';

export async function fetchProgram(id: string) {
  try {
    const data = await sql `SELECT program_name FROM programs
                            WHERE program_id = ${id}`;

    return data;
  } catch (error) {
    console.log('Error recuperando el programa asignado al atleta:',error);
    return undefined;
  }
}