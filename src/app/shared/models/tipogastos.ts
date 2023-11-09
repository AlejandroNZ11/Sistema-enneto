export class TipoGasto {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    nombre = "";
}

export interface DataTipoGasto {
    totalData: number;
    data: ITipoGasto[];
}

export interface ITipoGasto {
    tipoGastoId: string;
    nombre: string;
    estado: string;
}

export class tipoGastosResponse {
    nombre = "";
}