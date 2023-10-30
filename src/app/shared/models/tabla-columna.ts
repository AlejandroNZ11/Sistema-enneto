import { especialidadResponse } from "./especialidades";



export interface Accion<T = any> {
  accion: string;
  fila?: T
}
export const PageSize = {
  size: 10,
};
export interface Paginacion {
  page: number;
  size: number;
  skip: number;
  limit: number;
}

export const getEntityPropiedades = (entidad: string): Array<any> => {
  let resultados: any = [];
  let clase: any;
  switch (entidad) {
    case 'Especialidad': clase = new especialidadResponse(); break;
  }
  if (clase) {
    resultados = Object.keys(clase);
  }
  return resultados;
}

export const classIcon = (accion: string): string => {
  let clase: string = '';
  switch(accion){
    case 'Editar': clase = 'fa-solid fa-pen-to-square m-r-5'; break;
    case 'Eliminar': clase = 'fa fa-trash-alt m-r-5'; break;
  }
  return clase;
}