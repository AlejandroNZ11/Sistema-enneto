export class aseguradoras {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
    estado = "";

}
export interface Iaseguradoras {
    aseguradoraId: string;
    descripcion: string;
    estado: string;
}
export interface DataAseguradoras {
    totalData: number;
    data: Iaseguradoras[];
}