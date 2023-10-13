export class tipoTarjeta {
    tipoTarjetaId: string = "";
    descripcion: string = "";
    estado: string = "";
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
