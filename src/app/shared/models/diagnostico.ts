export class diagnostico {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';//'3fa85f64-5717-4562-b3fc-2c963f66afa6'|'D30C2D1E-E883-4B2D-818A-6813E15046E6'
    usuarioId = "";
    enfermedadId= "";
    descripcion = "";
    estado= "";
  }
  export interface DataDiagnostico {
    totalData: number;
    data: Idiagnostico[];
  }
  export interface Idiagnostico {
    enfermedadId: string;
    descripcion:string
    estado:string
    
  }

  export class DiagnosticoResponse {
    //enfermedadId= "";
    descripcion = "";
  
  }


