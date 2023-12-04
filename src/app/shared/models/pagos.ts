export class PagosRequest {
    transaccionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    numeroPago!: number;
    estadoPago!: number;
    fechaRegistro !: Date;
    fechaVencimiento!: Date;
    monto!: number;
    idUsuario !: number;
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = '';
}
export interface PagosResponse {
    pagoId: string;
    transaccionId: string;
    numeroPago: number;
    estadoPago: number;
    fechaRegistro: Date;
    fechaVencimiento: Date;
    monto: number;
    usuarioId: number;
}
export interface PagosListData {
    data: PagosResponse[];
    totalData: number;
}
