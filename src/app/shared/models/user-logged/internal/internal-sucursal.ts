import { SucursalResponse } from "../../sucursal/sucursal-response";
import { InternalAlmacen, fromResponse as fromAlmacen } from './internal-almacen';

export interface UnselectedSucursal extends Omit<SucursalResponse, 'almacenes'> {
	selected: false;
	almacenes?: undefined;
}

export interface SelectedSucursal extends SucursalResponse {
	selected: true;
	almacenes: InternalAlmacen[];
}

export type InternalSucursal = UnselectedSucursal | SelectedSucursal;

export function fromResponse(sucursal: SucursalResponse): InternalSucursal {
	if (sucursal.almacenes)
		return {
			...sucursal,
			selected: true,
			almacenes: sucursal.almacenes.map(fromAlmacen),
		};

	return {
		...sucursal,
		selected: false,
		almacenes: undefined,
	};
}

export function findSelected(
	sucursales: InternalSucursal[]
): SelectedSucursal | undefined {
	return sucursales.find(s => s.selected) as SelectedSucursal;
}
