export class SucursalResponse {
    id!:number;
    nombre!:string;
    direccion!:string;
    isDefault!:boolean;
    almacenes!: SucursalAlmacen[];
		enableVenta!: boolean;
}

export interface SucursalAlmacen {
	id: number;
	nombre: string;
	descripcion?: string;
	ubicacion?: string;
}