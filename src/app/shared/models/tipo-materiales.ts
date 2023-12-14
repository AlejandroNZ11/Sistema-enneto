
export class tipomateriales {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    descripcion = "";
    estado= "";
  }
  export interface DataTipomateriales {
    totalData: number;
    data: Itipomateriales[];
  }
  export interface Itipomateriales {
    tipoMaterialId: string;
    nombre: string;
    descripcion: string;
    estado:string;
  }

  export class TipomaterialesResponse {
    nombre = "";
    descripcion = "";
  }