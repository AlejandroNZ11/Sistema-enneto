export class cajaAC {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    cajaId="";
    turnoId!: number;
    importeApertura= "";
    importeCierre= "";
}

export interface DataCajaAC {
    totalData: number;
    data: IcajaAC[];
}
export interface IcajaAC {
    cajaAperturaId: string;
    importeApertura: number;
    importeCierre: number;
    turnoId: number;
    cajaId: string;
    fechaApertura:string;
    fechaCierre: string;

}

export class turno {
    ninguno= 0;
    mañana= 1; 
    tarde= 2;
    noche= 3;
}
