export class categoria {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre= "";
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

export class categoriaResponse {
    nombre = "";
}