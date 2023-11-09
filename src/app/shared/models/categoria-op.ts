export class categoria {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre= "";
    descripcion= "";
}
export interface Icategoria {
    categoriaMaterialesId: string;
    nombre: string;
    descripcion: string;
    estado:string;
}
export interface DataCategoria {
    totalData: number;
    data: Icategoria[];
}

export class CategoriaResponse {
    nombre = "";
    descripcion = "";
}