export class PacienteRequest {
    TipoDocumentoId = '';
    NumeroDocumento = '';
    Nombres = '';
    Apellidos = '';
    FechaNacimiento!: Date;
    Edad = '';
    Ocupacion = '';
    Direccion = '';
    GradoInstruccionId = '';
    PaisId = '';
    DepartamentoId = '';
    ProvinciaId = '';
    Ubigeo = '';
    Celular = '';
    TipoPacienteId = '';
    EstadoCivil = '';
    Sexo = '';
    FormaEnteroClinica = '';
    NombreContacto = '';
    TipoHistoria = '';
    AseguradoraId = '';
    EmpresaId = '';
    Email = '';
    FotoPaciente = '';
    Titulo = '';
    Observacion = '';
    SedeId = '';
    ClinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    UsuarioId = '';
}
export interface PacienteList {
    pacienteId: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    tipoDocumentoId: string;
    numeroDocumento: string;
    edad: string;
    ocupacion: string;
    direccion: string;
    gradoInstruccionId: string;
    paisId: string;
    ubigeo: string;
    celular: string;
    tipoPacienteId: string;
    estadoCivil: string;
    sexo: string;
    formaEnteroClinica: string;
    nombreContacto: string;
    tipoHistoria: string;
    aseguradoraId: string;
    empresaId: string;
    email: string;
    fotoPaciente: string;
    titulo: string;
    observacion: string;
    sedeId: string;
    fechaRegistro: string;
    estado: string;
}
export interface PacienteListData {
    data: PacienteList[];
    totalData: number;
}
export interface PacienteEditar {
    pacienteId: string;
    nombre: string;
    apellido: string;
    edad: string;
    ocupacion: string;
    direccion: string;
    lugarNacimiento: string;
    informacionClinica: string;
    sexo: string;
    foto: string;
    estadoCivil: string;
    afiliacion: string;
    email: string;
    observacion: string;
    estudios: string;
    fechaNacimiento: Date;
    pacienteAlergias: string;
    titulo: string;
    detalleOdontograma: string;
    celular: string;
    tipoDocumento: string;
    numeroDocumento: string;
    paisId: string;
    departamentoId: string;
    provinciaId: string;
    distritoId: string;
    tipoPacienteId: string;
    historia: string;
    empresa: string;
    fechaRegistro: string;
    estado: string;
}
export interface PacienteByDNI {
    apellido_materno: string
    apellido_paterno: string
    codigo_verificacion: number
    direccion: string
    direccion_completa: string
    nombres: string
    numero: number
};

export interface PacienteByDNIResponse {
    data: PacienteByDNI
    source: string
    success: boolean
    message: string
}