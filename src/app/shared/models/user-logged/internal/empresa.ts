import { EmpresaResponse } from "../../empresa/empresa-response";

export interface Empresa extends EmpresaResponse {
	selected: boolean;
}

export function fromResponse(empresa: EmpresaResponse): Empresa {
	return {
		...empresa,
		selected: false,
	};
}
