export class almacen {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    estado = "";
    sedeId!: number;
    nombreAlmacen = "";
}
export interface Ialmacen {
    tipoMonedaId: string;
    descripcion: string;
    estado: string;
}
export interface DataAlmacen {
    totalData: number;
    data: Ialmacen[];
}