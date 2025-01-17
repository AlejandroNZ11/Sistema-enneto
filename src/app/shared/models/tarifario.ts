export class tarifario {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    tarifarioId= "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    descripcion = "";
    precio="";
    grupo?: string[];
    estado!: number;
    fechaRegistro!: Date;
    tipoConceptoId?: string[];
    categoriaId?: string[];
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
    tipoConceptoId: string;
    medidaId: string;
    grupo: string;
    categoriaId: string;
    unidadId: string;
    precio: number;
    estado: string;
    fechaRegistro: Date;
}

export class tarifarioResponse {
    descripcion = "";
    tipoConceptoNombre= "";
    medidaNombre= "";
    grupo= "";
    categoriaNombre= "";
    unidadNombre= "";
    precio= "";
    fechaRegistro= "";
}