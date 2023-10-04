export class tipoPago {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    metodopago = "";
    descripcion = "";
    estado = "";
}

export interface DataTipoPago {
    totalData: number;
    data: ITipoPago[];
}

export interface ITipoPago {
    tipoPagoId: string;
    metodopago: string;
    descripcion: string;
    estado: string;
}
