export class TipoDocumento {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    usuarioId = "";
    descripcion = "";
    abreviatura = "";
    serie = "";
    inicio = "";
    fin = "";
}

export interface DataTipoDocumento {
    totalData: number;
    data: ITipoDocumento[];
}

export interface ITipoDocumento {
    tipoDocumentoId: string;
    descripcion: string;
    abreviatura: string;
    serie: string;
    inicio: string;
    fin: string;
    estado: string;
}


export class tipoDocumentoResponse {
    descripcion = "";
    abreviatura = "";
    serie = "";
    inicio = "";
    fin = "";
}
