export class banco {
    bancoId: string = "3414b9e5-ecb8-477f-e60b-08dbb86db1a5";
    descripcion: string = "";
    estado: string = "";
}
export interface Ibancos{
    bancoId: string;
    descripcion: string;
    estado: string;
}
export interface DataBancos {
    totalData: number;
    data: Ibancos[];
}
