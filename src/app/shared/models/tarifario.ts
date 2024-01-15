export class tarifario {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
    costo="";
    estado!: number;
    fechaRegistro!: Date;
    tipoconcepto?: string[];
    moneda?: string[];
    medida?: string[];
    unidad?: string[];
    
}

export interface DataTarifario {
    totalData: number;
    data: Itarifario[];
}

export interface Itarifario{
    tarifarioId : string;
    descripcion: string;
    tipoconcepto: string;
    medida: string;
    moneda: string;
    unidad: string;
    costo: number;
    estado: string;
    fechaRegistro: Date;
}

export class tarifarioResponse {
    descripcion = "";
    tipoConcepto= "";
    medida= "";
    moneda= "";
    unidad= "";
    costo= "";
    fechaRegistro= "";
}