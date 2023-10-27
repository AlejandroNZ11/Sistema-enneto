export class Apoderado {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    apoderadoId = '';
    usuarioId = '';
    tipoDocumento = '';
    documento = '';
    nombre = '';
    direccion = '';
    telefono = '';
    estado = false
}

export interface DataApoderado {
    totalData: number;
    data: IApoderado[];
}

export interface IApoderado {
    apoderadoId: string;
    tipoDocumento: string;
    nombre: string;
    documento: string;
    direccion: string;
    telefono: string;
    estado: boolean;
}
