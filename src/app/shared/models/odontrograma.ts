
export interface DataOdontogramaPaciente{

  data:IodontogramaPaciente[];
  totalData:number;
}


export interface IodontogramaPaciente {
  clinicaId:      string;
  usuarioId:      string;
  pacienteId:     string;
  tipo:           string;
  halllazgoId:    number;
  categoria:      string;
  estado:         string;
  marcas:         string;
  numeroDiente:   number;
  dienteFinal:    number;
  sigla:          string;
  especificacion: string;
  idUsuario:      string;
  fechaHora:      string;
}