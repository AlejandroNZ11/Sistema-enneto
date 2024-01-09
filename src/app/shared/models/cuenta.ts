export class cuenta {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    estado = "";
    total= "";
  }
  export interface DataCuenta {
    totalData: number;
    data: Icuenta[];
  }
  export interface Icuenta {
    cuentaPagarId: string;
    nombre: string;
    total: number;
    estado: string;
  }

  export class cuentaResponse {
    nombre = "";
    total = "";
  }