export class Permiso {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = '';
    menuId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    rolId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    modulo = '';
    cargo = '';
    read = 0;
    insert = 0;
    update = 0;
    delete = 0;
}

export interface DataPermiso {
    totalData: number;
    data: IPermiso[];
}

export interface IPermiso {
    permisoId: string;
    menuId: string;
    rolId: string;
    modulo: string;
    cargo: string;
    read: number;
    insert: number;
    update: number;
    delete: number;
}
