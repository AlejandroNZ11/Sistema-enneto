export class presentacion {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre= "";
    estado="";
}
export interface Ipresentacion {
    presentacionId: string;
    nombre: string;
    estado: string;
}
export interface DataPresentacion {
    totalData: number;
    data: Ipresentacion[];
}

export class PresentacionResponse {
    nombre = "";
}