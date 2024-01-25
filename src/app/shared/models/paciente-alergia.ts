export interface DataPacienteAlergia{
  data: IPacienteAlergia[];
  totalData: number
}

export interface IPacienteAlergia {
  pacienteAlergiaId: string,
  pacienteId: string,
  alergiaId: string,
  observacion: string,
  estado: string
}
