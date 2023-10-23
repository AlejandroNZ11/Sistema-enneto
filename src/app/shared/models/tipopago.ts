export class tipoPago {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    tipoPagoId = "";
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
