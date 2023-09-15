export class alergias {
    clinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId: string = "";
    descripcion: string = "";
  }
  export interface Ialergias {
    clinicaId: string;
    usuarioId: string;
    descripcion: string;
    estado:string;
  }
  export interface DataAlergias {
    totalData: number;
    data: Ialergias[];
  }