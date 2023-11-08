export class TipoPago {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    descripcion = "";
    estado = "";
    metodoPago = "";
}

export interface DataTipoPago {
    totalData: number;
    data: ITipoPago[];
}

export interface ITipoPago {
    tipoPagoId: string;
    metodoPago: string;
    descripcion: string;
    estado: string;
}

export class tipoPagoResponse {
    descripcion = "";
}
