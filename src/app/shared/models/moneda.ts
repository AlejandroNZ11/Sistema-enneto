export class Moneda {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    descripcion = "";
    estado = "";
}

export interface DataMoneda {
    totalData: number;
    data: ITipoMoneda[];
}

export interface ITipoMoneda {
    tipoMonedaId: string;
    descripcion: string;
    estado: string;
}
export class monedaResponse {
    descripcion = "";
}