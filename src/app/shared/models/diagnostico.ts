export class diagnostico {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    diagnosticoId = "";
    nombre = "";
    diagnostico ="";
    
  }
  export interface DataDiagnostico {
    totalData: number;
    data: Idiagnostico[];
  }
  export interface Idiagnostico {
    diagnosticoId: string;
    pacienteId:string
    nombre: string;
    diagnostico: string;
    estado: string;
  }
   
  export class DiagnosticoResponse {
    pacienteId = "";
      nombre= "";
      diagnostico = "";
  
  }


