export class medida {
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId = "";
  nombre = "";
}
export interface Imedida {
  unidadMedidaId: string;
  nombre: string;
  estado: string;
}
export interface DataMedida {
  totalData: number;
  data: Imedida[];
}

export class medidaResponse {
  nombre = "";
}