
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