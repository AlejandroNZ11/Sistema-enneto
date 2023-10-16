export class MedicoRequest {
  ClinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  UsuarioId = '';
  Especialidades?: string[];
  Nombres = '';
  Apellidos = '';
  Abreviatura = '';
  TipoDocumento = '';
  NumeroDocumento = '';
  ColegioMedico = '';
  Telefono = '';
  Celular = '';
  Direccion = '';
  Email = '';
  FechaNacimiento!: Date;
  Sexo = '';
}
export interface MedicoList {
  medicoId: string;
  especialidadesAsociadas: string[];
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  colegioMedico: string;
  telefono: string;
  celular: string;
  direccion: string;
  email: string;
  fechaNacimiento: Date;
  fechaRegistro: string;
  estado: string;
  sexo: string;
  foto: string;
  firma: string;
}
export interface MedicoListData {
  data: MedicoList[];
  totalData: number;
}

export interface MedicoEditar {

  medicoId: string;
  especialidadesAsociadas: string[];
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  tipoDocumentoId: string;
  colegioMedico: string;
  telefono: string;
  celular: string;
  direccion: string;
  email: string;
  fechaNacimiento: Date;
  fechaRegistro: Date;
  estado: string;
  sexo: string;
  foto: string;
  firma: string;
  abreviatura: string;
  clinicaId: string;
  usuarioId: string;
}

export interface MedicoByDNI {
  apellido_materno: string
  apellido_paterno: string
  codigo_verificacion: number
  direccion: string
  direccion_completa: string
  nombres: string
  numero: number
};

export interface MedicoByDNIResponse {
  data: MedicoByDNI
  source: string
  success: boolean
  message: string
}