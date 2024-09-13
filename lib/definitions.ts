export type AthleteProgram = {
  athlete_programs_id: number;
  athlete_id: number;
  program_id: number;
  completed: number;
  current_session: number;
}

export type Program = {
  program_id: number;
  sessions: number;
  program_name: string;
  description: string;
};

export type ProgramName = {
  program_name: string;
};

export type Session = {
  session_id: number;
  program_id: number;
  session_number: number;
  session_name: string;
}