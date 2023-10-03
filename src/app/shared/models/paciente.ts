export class PacienteRequest {
    Nombre = '';
    Apellido = '';
    Edad = '';
    Ocupacion = '';
    LugarNacimiento = '';
    InformacionClinica = '';
    Direccion = '';
    DniPaciente = '';
    FechaNacimiento!: Date;
    Sexo = '';
    EstadoCivil = '';
    Afiliacion = '';
    PacienteAlergias = '';
    Telefono = '';
    Celular = '';
    Email = '';
    Titulo = '';
    PaisId = '';
    DistritoId = '';
    Estudios = '';
    DetalleOdontograma = '';
    ClinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    UsuarioId = '';
    
}
export interface PacienteResponse {
    pacienteId: string;
    nombre: string;
    apellido: string;
    edad: string;
    ocupacion: string;
    lugarNacimiento: string;
    direccion: string;
    telefono: string;
    dniPaciente: string;
    foto: string;
    fechaNacimiento: Date;
    sexo: string;
    estadoCivil: string;
    afiliacion: string;
    pacienteAlergias: string;
    email: string;
    titulo: string;
    paisId: number;
    distritoId: string;
    observacion: string;
    estado: string;
    estudios: string;
    detalleOdontograma: string;
}
export interface PacienteListData {
    data: PacienteResponse[];
    totalData: number;
}
