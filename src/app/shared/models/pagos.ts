export class PagosRequest {
    TransaccionId = '';
    NumeroPago = '';
    EstadoPago = '';
    FechaRegistro !: Date;
    FechaVencimiento!: Date;
    Monto = '';
    IdUsuario = '';
    TratamientoId = '';
    ClinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    UsuarioId = '';
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
    tratamientoId: string; 
}
export interface PagosListData {
    data: PagosResponse[];
    totalData: number;
}
