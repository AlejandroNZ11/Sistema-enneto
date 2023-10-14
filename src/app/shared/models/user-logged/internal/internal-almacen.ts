import { SucursalAlmacen } from "../../sucursal/sucursal-response";
export interface InternalAlmacen extends SucursalAlmacen {
	selected: boolean;
}

export function fromResponse(almacen: SucursalAlmacen): InternalAlmacen {
	return {
		...almacen,
		selected: false,
	};
}
