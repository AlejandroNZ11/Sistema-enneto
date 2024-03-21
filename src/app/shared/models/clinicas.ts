export class Clinicas {
    clinicaId = "d30c2d1e-e883-4b2d-818a-6813e15046e6";
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