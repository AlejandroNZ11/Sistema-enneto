export class TipoGastos {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    nombre = "";
}

export interface DataTipoGastos {
    totalData: number;
    data: ITipoGastos[];
}

export interface ITipoGastos {
    tipoGastosId: string;
    nombre: string;
    estado: string;
}

export class tipoGastosResponse {
    nombre = "";
}