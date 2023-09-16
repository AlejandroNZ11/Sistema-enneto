export class tipoConcepto {
    clinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId: string = "";
    descripcion: string = "";
}
export interface ItipoConcepto {
    tipoConceptoId: string;
    descripcion: string;
    estado:string;
}
export interface DataTipoConcepto {
    totalData: number;
    data: ItipoConcepto[];
}