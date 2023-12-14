export class tipoTarjeta {
    clinicaId = "D30C2D1E-E883-4B2D-818A-6813E15046E6";
    usuarioId = "";
    tipoTarjetaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    descripcion= "";
    estado!: number;
}
export interface ITipoTarjeta {
    tipoTarjetaId: string;
    descripcion: string;
    estado: string;
}
export interface DataTipoTarjetas {
    totalData: number;
    data: ITipoTarjeta[];
}
export class TipoTarjetaResponse {
    descripcion = "";
}