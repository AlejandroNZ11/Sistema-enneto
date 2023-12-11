export class tipoConcepto {
    clinicaId= 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
}
export interface ItipoConcepto {
    tipoConceptoId: string;
    nombre: string;
    estado:string;
}
export interface DataTipoConcepto {
    totalData: number;
    data: ItipoConcepto[];
}

export class TipoConcepto {
    nombre="";
}