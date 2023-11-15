export class departamento {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    paisId="";
  }
  export interface DataDepartamento {
    totalData: number;
    data: Idepartamento[];
  }
  export interface Idepartamento {
    departamentoId: string;
    nombre: string;
    estado: string;
    paisId:string;
  }
