export class tipoGasto {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
}

export interface DataTipoGasto {
    totalData: number;
    data: ITipoGasto[];
}

export interface ITipoGasto {
    tipoGastoId: string;
    nombre: string;
    estado: string;
}
