
export class banco {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    descripcion = "";
  }
  export interface DataBancos {
    totalData: number;
    data: Ibancos[];
  }
  export interface Ibancos {
    bancoId: string;
    descripcion: string;
    estado:string;
  }