import { createClient } from '@/utils/supabase/server';
import { Athlete, Exercise, Program, ProgramName, SessionData } from './definitions';

// Devuelve el programa que tiene asignado el atleta a través de la tabla athlete_programs
export async function fetchProgram(athleteId: string): Promise<ProgramName | undefined> {
  // Inicializa el cliente de Supabase
  const supabase = await createClient();
  try {
    // Obtener el program_id correspondiente al atleta
    const { data: athleteProgram, error: programError } = await supabase
      .from('athlete_programs')
      .select('program_id')
      .eq('athlete_id', athleteId)
      .single();

    if (programError) {
      throw new Error(programError.message);
    }

    const programId = athleteProgram.program_id;

    // Obtener el programa actual del atleta
    const { data: returnedProgram, error: programDataError } = await supabase
    .from('programs')
    .select('program_name')
    .eq('program_id', programId)
    .single();

    if (programDataError) {
      console.error('Error recuperando el programa:', programDataError);
      throw new Error('Error recuperando el programa.');
    }

    if (returnedProgram) {
      return returnedProgram as ProgramName; // Hacemos un type assertion
    }
  } catch (error) {
    console.log('Error recuperando el programa asignado al atleta:', error);
    return undefined;
  }
}

// Busca la sesión que tiene en curso a partir de athlete_programs, y devuelve el nombre de la sesión y los ejercicios correspondientes
export async function fetchCurrentSession(athleteId: string): Promise<SessionData | undefined> {

  const supabase = await createClient();
  try {
    // Obtener el programa y la sesión actual del atleta
    const { data: currentProgram, error: currentProgramError } = await supabase
      .from('athlete_programs')
      .select('program_id, current_session')
      .eq('athlete_id', athleteId)
      .single();

    if (currentProgramError) {
      console.error('Error recuperando el programa y sesión actual:', currentProgramError);
      throw new Error('Error recuperando el programa y sesión actual.');
    }

    const programId = currentProgram.program_id;
    const sessionNumber = currentProgram.current_session;

    // Obtener la información de la sesión
    const { data: sessionInfo, error: sessionInfoError } = await supabase
      .from('sessions')
      .select('session_id, session_name')
      .eq('program_id', programId)
      .eq('session_number', sessionNumber)
      .single();

    if (sessionInfoError) {
      console.error('Error recuperando la sesión:', sessionInfoError);
      throw new Error('Error recuperando la sesión.');
    }

    const sessionID = sessionInfo.session_id;

    // Obtener los ejercicios correspondientes a la sesión actual
    const { data: exercisesQuery, error: exercisesQueryError } = await supabase
      .from('session_exercises')
      .select('exercise_id')
      .eq('session_id', sessionID);

    if (exercisesQueryError) {
      console.error('Error recuperando los ejercicios de la sesión:', exercisesQueryError);
      throw new Error('Error recuperando los ejercicios de la sesión.');
    }

    // Obtener los detalles de los ejercicios usando los IDs obtenidos
    const exerciseIds = exercisesQuery.map(exercise => exercise.exercise_id);

    const { data: exercisesDetails, error: exercisesDetailsError } = await supabase
      .from('exercises')
      .select('exercise_id, exercise_name, description, objective, reps, sets, equipment, video_url')
      .in('exercise_id', exerciseIds);

    if (exercisesDetailsError) {
      console.error('Error recuperando los detalles de los ejercicios:', exercisesDetailsError);
      throw new Error('Error recuperando los detalles de los ejercicios.');
    }

    // Mapea el resultado al tipo Exercise, añadiendo la propiedad 'completed' como false
    const exercises: Exercise[] = exercisesDetails.map(row => ({
      exercise_id: row.exercise_id,
      exercise_name: row.exercise_name,
      description: row.description,
      objective: row.objective,
      reps: row.reps,
      sets: row.sets,
      equipment: row.equipment,
      video_url: row.video_url,
      completed: false
    }));

    return {
      session_name: sessionInfo.session_name,
      exercises: exercises
    };
  } catch (error) {
    console.log('Error recuperando la sesión actual:', error);
    return undefined;
  }
}

export async function getGymIdByGymCode(gymCode: string) {
  // Inicializa el cliente de Supabase
  const supabase = await createClient();

  try {
    const {data, error} = await supabase
    .from('gyms')
    .select('gym_id')
    .eq('gym_code', gymCode)
    .single()

    if (error) {
      console.log('Error recuperando el gimnasio:', error)
      return null
    }

    return data?.gym_id || null

  } catch (error) {
    console.log('Error inesperado al recuperar el gimnasio por código de gimnasio:', error)
    return null;
  }
}

export async function getMyAthletes(gymId: string): Promise<Athlete[] | null> {
  const supabase = await createClient()

  try {
    const {data, error} = await supabase
    .from('athletes')
    .select()
    .eq('gym_id', gymId)

    if (error){
      console.log('Error recuperando los atletas asociados al gimnasio', error)
      return null
    }

    return data;
  } catch (error) {
    console.log('Error inesperado al recuperar los atletas del gimnasio')
    return null;
  }
}

export async function getAllPrograms(): Promise<Program[] | null> {
  const supabase = await createClient()

  try {
    const {data, error} = await supabase
    .from('programs')
    .select()

    if (error){
      console.log('Error recuperando los programas de ejercicio', error)
      return null
    }

    return data
  } catch (error){
    console.log('Error inesperado al recuperar los programas de ejercicio')
    return null
  }
}

export async function assignOrUpdateProgramToAthlete(athleteId: string, programId: number) {
  const supabase = await createClient();

  try {
    // Verificamos si ya existe un registro en la tabla athlete_programs
    const { data: existingProgram, error: checkError } = await supabase
      .from('athlete_programs')
      .select('program_id')
      .eq('athlete_id', athleteId)
      .single(); // Queremos un solo registro

    // Si hay un error al realizar la consulta, lo manejamos
    if (checkError && checkError.code !== 'PGRST116') {  // Error 'PGRST116' significa "No se encontró el registro"
      console.log('Error al verificar el programa:', checkError);
      return null;
    }

    // Si el programa ya existe, actualizamos
    if (existingProgram) {
      const { data: updatedProgram, error: updateError } = await supabase
        .from('athlete_programs')
        .update({
          program_id: programId,
          completed: 0,
          current_session: 1
        })
        .eq('athlete_id', athleteId);

      if (updateError) {
        console.log('Error actualizando el programa:', updateError);
        return null;
      }

      // Después de actualizar, obtenemos el nombre del programa
      const { data: programData, error: programError } = await supabase
        .from('programs')
        .select('program_name')
        .eq('program_id', programId)
        .single();

      if (programError) {
        console.log('Error recuperando el programa:', programError);
        return null;
      }
      
      console.log('Actualizando el atleta al programa: ', programData?.program_name )
      return { program_name: programData?.program_name };
    } 

    // Si no existe el registro, insertamos un nuevo programa
    const { data: insertData, error: insertError } = await supabase
      .from('athlete_programs')
      .insert({ 
        athlete_id: athleteId, 
        program_id: programId,
        completed: 0,
        current_session: 1
      });

    if (insertError) {
      console.log('Error insertando el programa:', insertError);
      return null;
    }

    // Después de insertar, obtenemos el nombre del programa
    const { data: programData, error: programError } = await supabase
      .from('programs')
      .select('program_name')
      .eq('program_id', programId)
      .single();

    if (programError) {
      console.log('Error recuperando el programa:', programError);
      return null;
    }

    console.log('Asignando al atleta el programa: ', programData?.program_name )
    return { program_name: programData?.program_name };

  } catch (error) {
    console.log('Error al asignar o actualizar el programa del atleta:', error);
    return null;
  }
}

export async function fetchAthleteInfo(athleteId: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('athletes')
      .select()
      .eq('athlete_id', athleteId)
      .single()
    
    if (error) {
      console.log('Error recuperando los datos del atleta:', error)
      return null;
    }

    return data;
  } catch (error) {
    console.log('Error inesperado al recuperar los datos del atleta')
    return null;
  }
}

export async function setSessionAsCompleted(athleteId: string) {
  const supabase = await createClient()

  try {
    // Recuperar el progreso del programa
    const programProgress = await getProgramProgress(athleteId)

    // Verificar si `programProgress` es nulo
    if (!programProgress) {
      console.log("No se pudo recuperar el progreso del programa.");
      return null;
    }

    const { currentSessionNumber, totalSessions } = programProgress

    let updateData

    // Verificar si la sesión actual es menor al total de sesiones
    if (currentSessionNumber < totalSessions) {
      updateData = { current_session: currentSessionNumber + 1 };
    } else {
      updateData = { completed: 1 };
    }

    // Actualizar la tabla `athlete_programs`
    const { data: updatedSession, error: updateError } = await supabase
      .from('athlete_programs')
      .update(updateData)
      .eq('athlete_id', athleteId)
      .select();

     if (updateError) {
      console.log('Error actualizando la sesion actual:', updateError);
      return null;
     }

     console.log('Sesión actualizada o programa marcado como completado:', updatedSession);
     return updatedSession;
  } catch (error) {
    console.log('Error inesperado al marcar la sesión como completada:', error)
    return null;
  }
}

export async function getProgramProgress(athleteId: string) {
  const supabase = await createClient()

  try {
    // Recuperamos el número de sesión actual
    const { data: athleteProgram, error: currentSessionError } = await supabase
      .from('athlete_programs')
      .select('current_session, program_id, completed')
      .eq('athlete_id', athleteId)
      .single()

    if (currentSessionError) {
      console.log('Error recuperando la sesión actual del atleta:', currentSessionError)
      return null
    }

    // Extraemos current_session y program_id
    const { current_session: currentSessionNumber, program_id: programId, completed: programCompleted } = athleteProgram

    // Recuperamos el número total de sesiones que tiene ese programa
    const { data: totalSessionsData, error: totalSessionsError } = await supabase
      .from('programs')
      .select('sessions')
      .eq('program_id', programId)
      .single()
      
    if (totalSessionsError) {
      console.log('Error recuperando el número total de sesiones del programa:', totalSessionsError)
      return null
    }

    const totalSessions = totalSessionsData.sessions

    // Retorna tanto el número de sesión actual como el total de sesiones
    return { currentSessionNumber, totalSessions, programCompleted }
  } catch (error) {
    console.log('Error inesperado al recuperar el número de sesión actual del atleta')
    return null
  }
}