
export class caja {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    estado!: number;
}
export interface DataCaja {
    totalData: number;
    data: Icaja[];
}
export interface Icaja {
    cajaId: string;
    nombre: string;
    estado: string;
}

export class cajaResponse {
    nombre = "";
}
