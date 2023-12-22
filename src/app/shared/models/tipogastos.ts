export class ConceptoGasto {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    nombre = "";
    estado = "";
}

export interface DataConceptoGasto {
    totalData: number;
    data: IConceptoGasto[];
}

export interface IConceptoGasto {
    conceptoGastoId: string;
    nombre: string;
    estado: string;
}

export class ConceptoGastosResponse {
    nombre = "";
}
