export class evolucion{
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId = "";
  pacienteId = "";
  especialidadId = "";
  medicoId = "";
  descripcion = "";
  fechaEvolucion ="";
  estado = 0;

}

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
  medicoNombre?:string,
  especialidadNombre?:string,
}

export class EvolucionPacienteResponse{
  fechaEvolucion= "";
  especialidad= "";
  medico= "";
  descripcion= "";
  estado= 0;
}
