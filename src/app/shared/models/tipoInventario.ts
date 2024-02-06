export class tipoinventario {
    clinicaId ="3fa85f64-5717-4562-b3fc-2c963f66afa6";
    usuarioId = "";
    nombre = "";
    descripcion = "";
    estado!: number;
}
export interface DatatipoInventario {
    totalData: number;
    data: Itipoinventario[];
}
export interface Itipoinventario {
    tipoinventarioId: string;
    nombre: string;
    descripcion : string;
    estado: number;
}
    