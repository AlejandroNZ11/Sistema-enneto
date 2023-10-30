import { EmpresaResponse } from '../empresa/empresa-response';
import { SucursalResponse } from '../sucursal/sucursal-response';
import { Flags } from './flags';
import { UserLoggedConfiguration } from './user-logged-configuration';

export class UserLogedResponse {
	sucursales!: SucursalResponse[];
	currents!: BranchWareHouse;
	usuario!: UsuarioData;
	grupoCorporativoId!: string | null;
}

export class BranchWareHouse {
	currentWareHouse!: number;
	currentWareHouseName!: string;
	currentBranchName!: string;
	currentBranch!: number;
}

export interface UsuarioData {
	nombres: string;
	cargo: string;
	personalId: number;
	ventaCiegas: boolean;
	esVendedor: boolean;
}
