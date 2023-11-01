import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-cobro-consulta',
  templateUrl: './cobro-consulta.component.html',
  styleUrls: ['./cobro-consulta.component.scss']
})
export class CobroConsultaComponent {
  // Variables utilizadas para las migas de pan
  public routes = routes;
  //public cobrosList: Array<CobroConsulta> = []; // Asegúrate de definir correctamente la interfaz CobroConsulta
  //dataSource!: MatTableDataSource<CobroConsulta>; // Asegúrate de definir correctamente la interfaz CobroConsulta

  // Variables para la paginación y filtros
  public searchDataValue = '';
  public fechaDesde = '';
  public fechaHasta = '';
  // ...

  /*constructor(public data: DataService, private router: Router) {}

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.cobrosList = [];

    this.data.getCobrosConsulta().subscribe((data: apiResultFormat) => {
      this.cobrosList = data.data as CobroConsulta[]; // Ajusta la asignación de datos recibidos
      this.dataSource = new MatTableDataSource<CobroConsulta>(this.cobrosList);
      // Otras funcionalidades y cálculos para la paginación, similar al ejemplo anterior
      // ...
    });
  }

  // Función para aplicar filtros por fecha y otros, similar al ejemplo anterior

  // Otras funciones y métodos similares a las anteriores adaptadas a la lógica de la lista de cobro de consulta
  // ...*/
  public aplicarFiltro(): void {
    // Lógica para filtrar por fecha u otros criterios
    // ...
  }
  public searchData(value: any): void {

  }
}
