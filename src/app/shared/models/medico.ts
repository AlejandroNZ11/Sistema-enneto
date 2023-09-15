export class MedicoRequest {
    clinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId: string = '';
    especialidades?: string[];
    nombres: string = '';
    apellidos: string = '';
    abreviatura: string = '';
    tipoDocumento: string = '';
    numeroDocumento: string = '';
    colegioMedico: string = '';
    telefono: string = '';
    celular: string = '';
    direccion: string = '';
    email: string = '';
    fechaNacimiento?: Date;
    sexo: string = '';
    foto: string = '';
    firma: string = '';
  }
  export interface MedicoResponse {
    medicoId: string;
    especialidadId: string;
    nombres: string;
    apellidos: string;
    numeroDocumento: string;
    colegioMedico: string;
    telefono: string;
    celular: string;
    direccion: string;
    email: string;
    fechaNacimiento: Date;
    fechaRegistro: Date;
    estado: number;
    sexo: string;
    foto: string;
    firma: string;
  }
  export interface MedicoListData {
    data: MedicoResponse[];
    totalData: number;
  }