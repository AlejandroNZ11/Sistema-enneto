export class diagnosticoHistoria{
  clinicaId= 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId= "";
  pacienteId= "";
  fecha= "";
  enfermedadId= "";
  estado="0";
}

export interface DataHistoriaDiagnostico{
  data: IHistoriaDiagnostico[];
  totalData: number
}

export interface IHistoriaDiagnostico {
  pacienteDiagnosticoId: string,
  pacienteId: string,
  fecha: string,
  enfermedadId: string
  estado: number
  nombreEnfermedad?:string
}


export class  HistoriaDiagnosticoResponse{
  diagnostico="";
  fecha="";
  codigoEnfermedad="";
}
