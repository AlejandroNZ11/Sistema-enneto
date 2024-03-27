export class Clinicas {
    clinicaId = "D30C2D1E-E883-4B2D-818A-6813E15046E6";
    Nombre ="";
    Direccion= "";
    Celular = "";
    Email ="";
    Ruc ="";
    Fecha!: Date;
    Foto = "";
    Estado!:"";
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
    data: Iclinicas;
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