export class TipoDocumento {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6'
    usuarioId = "";
    tipoComprobanteId = "";
    serie = "";
    inicio = "";
    fin = "";
    correlativoActual = "";
}

export interface DataTipoDocumento {
    totalData: number;
    data: ITipoDocumento[];
}

export interface ITipoDocumento {
    tipoDocumentoId: string;
    tipoComprobanteId: string;
    tipoComprobanteNombre: string;
    descripcion: string;
    serie: string;
    inicio: string;
    fin: string;
    correlativoActual: string;
    estado: string;
}

export class tipoDocumentoResponse {
    tipoComprobanteNombre = "";
    serie = "";
    inicio = "";
    fin = "";
    correlativoActual = "";
}
