export interface DataHistoriaDiagnostico{
  data: IHistoriaDagnostico[];
  totalData: number
}

export interface IHistoriaDagnostico {
  pacienteDiagnosticoId: string,
  pacienteId: string,
  fecha: string,
  codigoEnfermedad: string
  estado: number
}


export class  HistoriaDiagnosticoResponse{
  diagnostico="";
  fecha="";
  codigoEnfermedad01="";
}
