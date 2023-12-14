export class diagnostico {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    pacienteDiagnosticoId= "";
    pacienteId= "";
    diagnosticoId = "";
    nombre = "";
    diagnostico ="";
    
  }
  export interface DataDiagnostico {
    totalData: number;
    data: Idiagnostico[];
  }
  export interface Idiagnostico {
    pacienteDiagnosticoId: string;
    pacienteId:string
    diagnosticoId:string
    nombre: string;
    estado: number;
  }
   
  export class DiagnosticoResponse {
      pacienteId = "";
      nombre= "";
      diagnostico = "";
  
  }


