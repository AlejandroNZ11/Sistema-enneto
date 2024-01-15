export class tarifario {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
    precio="";
    estado!: number;
    fechaRegistro!: Date;
    tipoconceptoId?: string[];
    monedaId?: string[];
    medidaId?: string[];
    unidadId?: string[];
    
}

export interface DataTarifario {
    totalData: number;
    data: Itarifario[];
}

export interface Itarifario{
    tarifarioId : string;
    descripcion: string;
    tipoconceptoId: string;
    medidaId: string;
    monedaId: string;
    unidadId: string;
    precio: number;
    estado: string;
    fechaRegistro: Date;
}

export class tarifarioResponse {
    descripcion = "";
    tipoConceptoId= "";
    medidaId= "";
    monedaId= "";
    unidadId= "";
    precio= "";
    fechaRegistro= "";
}