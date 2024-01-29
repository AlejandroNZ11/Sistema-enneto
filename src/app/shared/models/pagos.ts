export class Pago {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = '';
    transaccionId?: string[];
    numeroPago!: number;
    estadoPago!: number;
    fechaRegistro!: Date;
    fechaVencimiento!: Date;
    monto!: number;
    idUsuario?: number[];
    tratamientoId?: string[];
    
}
export interface Ipago {
    pagoId: string;
    transaccionId: string;
    numeroPago: number;
    estadoPago: number;
    fechaRegistro: Date;
    fechaVencimiento: Date;
    monto: number;
    idUsuario: number;
    tratamientoId: string;
}
export interface DataPago {
    data: Ipago[];
    totalData: number;
}

export class PagoResponce {
    transaccionId= "";
    numeroPago= "";
    estadoPago= "";
    fechaRegistro= "";
    fechaVencimiento= "";
    monto= "";
    usuarioId= "";
    tratamientoId= "";   
}