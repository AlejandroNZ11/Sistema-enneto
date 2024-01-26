export interface DataEvolucionPaciente {
  totalData: number;
  data: IEvolucionPaciente[];
}
export interface IEvolucionPaciente {
  pacienteEvolucionId: string,
  pacienteId: string,
  especialidadId: string,
  medicoId: string ,
  descripcion: string,
  fechaEvolucion: string,
  estado: 0
}

export class EvolucionPacienteResponse{
  fechaEvolucion= "";
  especialidad= "";
  medico= "";
  descripcion= "";
  estado= 0;
}
