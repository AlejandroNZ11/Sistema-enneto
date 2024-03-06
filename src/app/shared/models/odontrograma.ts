
export interface DataOdontogramaPaciente{

  data:IodontogramaPaciente[];
  totalData:number;
}


export interface IodontogramaPaciente {
  pacienteOdontogramaId:string;
  clinicaId:      string;
  pacienteId:     string;
  tipo:           string;
  hallazgoId:    number;
  nombre:string;
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
