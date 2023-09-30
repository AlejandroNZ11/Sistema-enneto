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
export interface MedicoResponse {
  medicoId: string;
  especialidadId: string;
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
  estado: number;
  sexo: string;
  foto: string;
  firma: string;
  abreviatura:string;
  clinicaId:string;
  usuarioId:string;
}
export interface MedicoListData {
  data: MedicoResponse[];
  totalData: number;
}
