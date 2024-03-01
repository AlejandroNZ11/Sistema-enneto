
export interface DataOdontogramaPaciente{

  data:IodontogramaPaciente[];
  totalData:number;
}


export interface IodontogramaPaciente {
  pacienteOdontogramaId:string;
  clinicaId:      string;
  pacienteId:     string;
  tipo:           string;
  halllazgoId:    number;
  categoria:      string;
  estado:         number;
  marcas:         string;
  numeroDiente:   number;
  dienteFinal:    number;
  sigla:          string;
  especificacion: string;
  idUsuario:      string;
  fechaHora:      string;
}
