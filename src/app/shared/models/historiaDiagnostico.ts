export interface DataHistoriaDiagnostico{
  data: IHistoriaDagnostico[];
  totalData: number
}

export interface IHistoriaDagnostico {
  pacienteDiagnosticoId: string,
  pacienteId: string,
  fecha: string,
  codigoEnfermedad01: string
  estado: number
}


export class  HistoriaDiagnosticoResponse{
  diagnostico="";
  fecha="";
  codigoEnfermedad01="";
}
