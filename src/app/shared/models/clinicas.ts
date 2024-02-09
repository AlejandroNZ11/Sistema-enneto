export class Clinicas {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId ="";
    direccion= "";
    celular = "";
    email ="";
    ruc ="";
    fecha!: Date;
    foto = "";
    estado!: number;
}

export interface Iclinicas {
    clinicaId: string;
    nombre: string;
    direccion: string;
    celular: string;
    email: string;
    ruc: string;
    fecha: Date;
    foto: string;
    estado: string;
}
export interface DataClinicas{
    data: Iclinicas[];
    totalData: number;
}

export class ClinicasResponse {
    nombre="";
    direccion="";
    celular="";
    email="";
    ruc="";
    fecha="";
    foto="";
}