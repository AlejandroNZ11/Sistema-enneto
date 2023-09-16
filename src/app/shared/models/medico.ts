export class MedicoRequest {
    ClinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    UsuarioId: string = '';
    Especialidades?: string[];
    Nombres: string = '';
    Apellidos: string = '';
    Abreviatura: string = '';
    TipoDocumento: string = '';
    NumeroDocumento: string = '';
    ColegioMedico: string = '';
    Telefono: string = '';
    Celular: string = '';
    Direccion: string = '';
    Email: string = '';
    FechaNacimiento?: Date;
    Sexo: string = '';
  }
  export interface MedicoResponse {
    medicoId: string;
    especialidadId: string;
    nombre: string;
    apellido: string;
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