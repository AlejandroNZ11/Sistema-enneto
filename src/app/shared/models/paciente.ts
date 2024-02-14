export class PacienteRequest {
    TipoDocumentoId = '';
    NumeroDocumento = '';
    Nombres = '';
    Apellidos = '';
    FechaNacimiento!: Date;
    Edad = '';
    Ocupacion = '';
    Direccion = '';
    EstudioId = '';
    PaisId = 173;
    DepartamentoId = '';
    ProvinciaId = '';
    Ubigeo = 0;
    Celular = '';
    TipoPacienteId = '';
    EstadoCivil = '';
    Sexo = '';
    InformacionClinicaId = '';
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
    estudioId: string;
    paisId: string;
    ubigeo: string;
    celular: string;
    tipoPacienteId: string;
    estadoCivil: string;
    sexo: string;
    informacionClinicaId: string;
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
    nombreDepartamento:string;
    nombreEstudio:string;
}
export interface PacienteListData {
    data: PacienteList[];
    totalData: number;
}
export interface PacienteEditar {
    pacienteId: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    tipoDocumentoId: string;
    numeroDocumento: string;
    edad: string;
    ocupacion: string;
    direccion: string;
    estudioId: string;
    paisId: string;
    ubigeo: string;
    celular: string;
    tipoPacienteId: string;
    estadoCivilId: string;
    sexo: string;
    informacionClinicaId: string;
    contactoEmergencia: string;
    tipoHistoria: string;
    aseguradoraId: string;
    empresaId: string;
    email: string;
    foto: string;
    titulo: string;
    observacion: string;
    sedeId: string;
    fechaRegistro: Date;
    estado: string;
    clinicaId: string;
    usuarioId: string;

}


export interface PacienteEditar {
    pacienteId: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    tipoDocumentoId: string;
    numeroDocumento: string;
    edad: string;
    ocupacion: string;
    direccion: string;
    estudioId: string;
    paisId: string;
    ubigeo: string;
    celular: string;
    tipoPacienteId: string;
    estadoCivilId: string;
    sexo: string;
    informacionClinicaId: string;
    contactoEmergencia: string;
    tipoHistoria: string;
    aseguradoraId: string;
    empresaId: string;
    email: string;
    foto: string;
    titulo: string;
    observacion: string;
    sedeId: string;
    fechaRegistro: Date;
    estado: string;
    clinicaId: string;
    usuarioId: string;

    telefonoParentesco: string;
    domicilioParentesco: string;
    tipoParentesco: string;
    departamentoId:number;
    provinciaId:number;

}
export interface PacienteByDNI {
    apellido_materno: string
    apellido_paterno: string
    codigo_verificacion: number
    direccion: string
    direccion_completa: string
    nombres: string
    numero: number
}

export interface PacienteByDNIResponse {
    data: PacienteByDNI
    source: string
    success: boolean
    message: string
}
