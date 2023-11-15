export class almacen {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    almacenId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    estado = "";
    sedeId!: number;
    descripcion = "";
}
export interface Ialmacen {
    almacenId: string;
    sedeId: string;
    nombreAlmacen: string;
    estado: string;
}
export interface DataAlmacen {
    totalData: number;
    data: Ialmacen[];
}

export class AlmacenResponse {
    descripcion = "";
}    
