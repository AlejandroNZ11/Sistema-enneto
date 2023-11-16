export class roles {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
  }
  export interface Iroles {
    rolId: string;
    nombre: string;
    estado: string; 
  }
  export interface DataRoles {
    totalData: number;
    data: Iroles[];
  }

  export class rolResponse {
    nombre= "";
  }