export class Moneda {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
}

export interface DataMoneda {
    totalData: number;
    data: IMoneda[];
}

export interface IMoneda {
    monedaId: string;
    descripcion: string;
    estado: string;
}
