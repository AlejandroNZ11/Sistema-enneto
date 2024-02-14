
export class citaMedica {
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId = "";
  pacienteId = "";
  medicoId = "";
  especialidadId = "";
  sedeId = "";
  motivoConsulta = "";
  tipoCitadoId = "";
  fecha = "";
  observacion = "";
  estado = "";
  horaInicio = "";
  horaFin = "";
}
export interface DataCitaMedica {
  totalData: number;
  data: IcitaMedica[];
}
export interface IcitaMedica {
  citaMedicaId: string;
  pacienteId: string;
  medicoId: string;
  especialidadId: string;
  sedeId: string;
  motivoConsulta: string;
  tipoCitadoId: string;
  fecha: string;
  observacion: string;
  estado: string;
  horaInicio: string;
  horaFin: string;
  clinicaId: string;
  usuarioId: string;
}

export interface DataControlCitaMedica {
  totalData: number;
  data: IcontrolCitaMedica[];
}
export interface IcontrolCitaMedica {
  citaMedicaId: string;
  secuencia: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  nombrePaciente: string;
  apellidoPaciente: string;
  telefono: string;
  nombreMedico: string;
  apellidoMedico: string;
  nombreTipoCitado: string;
  colorTipoCitado: string;
  historia: string;
  informacion: string;
}

export interface IcitaMedicaCalendario {
  citas: citasCalendario[],
  medicos: medicosCalendario[]
}
export interface citasCalendario {
  id: string;
  start: Date;
  end: Date;
  title: string;
  backgroundColor: string;
  borderColor: string;
  medicoId: string;
}
export interface medicosCalendario {
  medicoId: string;
  apellidos: string;
  nombres: string;
  color: string;
}


// Interface Citas del PacienteId
export interface CitaMedicaPaciente {
  citaMedicaId: string;
  pacienteId: string;
  nombrePaciente: string;
  apellidoPaciente: string;
  medicoId: string;
  nombreMedico: string;
  apellidoMedico: string;
  especialidadId: string;
  sedeId: string;
  motivoConsulta: string;
  tipoCitadoId: string;
  citadoId: number;
  fecha: string;
  fechaFinal: string;
  observacion: string;
  estado: string;
  secuencia: number;
  horaInicio: string;
  horaFin: string;
}

export interface MedicoPaciente {
  medicoId: string;
  nombres: string;
  apellidos: string;
  color: string;
}

export interface DataCitaMedicaPaciente {
  data: {
    citas: CitaMedicaPaciente[];
    medicos: MedicoPaciente[];
  }[];
  totalData: number;
}


export interface CitasMedicaPacienteById {
  citaMedicaId:       string;
  pacienteId:         string;
  nombreMedico:       string;
  nombreEspecialidad: string;
  motivoConsulta:     string;
  fecha:              string;
  fechaFinal:         string;
  estado:             string;
}
