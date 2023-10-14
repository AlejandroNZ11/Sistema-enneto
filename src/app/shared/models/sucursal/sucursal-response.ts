export class SucursalResponse {
    id!:number;
    idEmpresa!:number;
    nombre!:string;
    direccion!:string;
    isDefault!:boolean;
    almacenes!: SucursalAlmacen[];
		enableVenta!: boolean;
}

export interface SucursalAlmacen {
	idAlmacen: number;
	idSucursal: number;
	nombre: string;
	descripcion?: string;
	ubicacion?: string;
	nombreCorto?: string;
}