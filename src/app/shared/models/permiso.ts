export class Permiso {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = '';
    modulo = '';
    cargo = '';
    leer = '';
    insertar = '';
    actualizar = '';
    anular = '';
}

export interface DataPermiso {
    totalData: number;
    data: IPermiso[];
}

export interface IPermiso {
    permisoId: string;
    modulo: string;
    cargo: string;
    leer: string;
    insertar: string;
    actualizar: string;
    anular: string;
    estado: string;
}

export class permisoResponse {
    modulo = '';
    cargo = '';
    leer = '';
    insertar = '';
    actualizar = '';
    anular = '';
}
