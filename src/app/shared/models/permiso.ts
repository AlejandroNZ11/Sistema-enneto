export class Permiso {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = '';
    menuId = '';
    rolId = '';
    modulo = '';
    cargo = '';
    read = '';
    insert = '';
    update = '';
    delete = '';
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
    read: string;
    insert: string;
    update: string;
    delete: string;
}
