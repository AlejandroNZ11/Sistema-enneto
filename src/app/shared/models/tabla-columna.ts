import { especialidadResponse } from "./especialidades";
import { apoderadoResponse } from "./apoderado";
import { tipoDocumentoResponse } from "./tipodocumento";
import { TipoTarjetaResponse } from "./tipotarjeta";
import { tipoPagoResponse } from "./tipopago";
import { DiagnosticoResponse } from "./diagnostico";
import { tipoGastosResponse } from "./tipogastos";
import { CategoriaResponse } from "./categoria-op";
import { PlanesResponse } from "./planes";
import { AlmacenResponse } from "./almacen";
import { bancoResponse } from "./bancos";
import { ProductoResponse } from "./producto";
import { rolResponse } from "./rol";
import { MarcaResponse } from "./marca";




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
    case 'TipoTarjeta': clase = new TipoTarjetaResponse(); break;
    case 'Apoderado': clase = new apoderadoResponse(); break;
    case 'TipoDocumento': clase = new tipoDocumentoResponse(); break;
    case 'TipoPago': clase = new tipoPagoResponse(); break;
    case 'Diagnostico' : clase = new DiagnosticoResponse(); break;
    case 'TipoGastos' : clase = new tipoGastosResponse(); break;
    case 'categoria' : clase = new CategoriaResponse(); break;
    case 'Planes': clase = new PlanesResponse(); break;
    case 'Almacen': clase = new AlmacenResponse(); break;
    case 'Banco': clase = new bancoResponse(); break;
    case 'Producto': clase = new ProductoResponse(); break;
    case 'Rol': clase = new rolResponse(); break;
    case 'Marca': clase = new MarcaResponse(); break;
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