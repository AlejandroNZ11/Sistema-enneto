export class tipoTarjeta {
    clinicaId = "";
    usuarioId = "";
    tipoTarjetaId= "";
    descripcion= "";
    estado = "";
}
export interface ITipoTarjeta {
    tipoTarjetaId: string;
    descripcion: string;
    estado: number;
}
export interface DataTipoTarjetas {
    totalData: number;
    data: ITipoTarjeta[];
}
