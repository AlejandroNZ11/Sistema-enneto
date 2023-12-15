export class tarifario {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
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
    costo: string;
    estado: string;
    fechaRegistro: string;
}

export class tarifarioResponse {
    descripcion = "";
    tipoconcepto= "";
    medida= "";
    moneda= "";
    unidad= "";
    costo= "";
    fechaRegistro= "";
}