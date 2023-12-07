export class categoriaM {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre= "";
    descripcion= "";
    estado= "";
}
export interface IcategoriaM {
    categoriaMaterialesId: string;
    nombre: string;
    descripcion: string;
    estado:string;
}
export interface DataCategoriaM {
    totalData: number;
    data: IcategoriaM[];
}

export class CategoriaResponse {
    nombre = "";
    descripcion = "";
}