export class categoria {
    clinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId: string = "";
    nombre: string = "";
}
export interface Icategoria {
    categoriaId: string;
    nombre: string;
    estado:string;
}
export interface DataCategoria {
    totalData: number;
    data: Icategoria[];
}