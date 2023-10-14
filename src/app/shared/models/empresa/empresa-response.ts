export class EmpresaResponse {
	razonSocial: string;
	isDefault!: boolean;
	id!: number;
	logo!: string;
	fullLogo?: string;
	constructor() {
		this.razonSocial = '';
	}
}
