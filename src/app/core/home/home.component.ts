import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public saludo: string = "";
  public routes = routes;
  public today = new Date();
  public currentHour = this.today.getHours();

  ngOnInit(): void {
    this.checkTime(this.currentHour);
  }

  checkTime(i: number) {
    if (i >= 0 && i < 12) { this.saludo = 'Buenos días' }
    if (i >= 12 && i < 19) { this.saludo = 'Buenas tardes' }
    if (i >= 19) { this.saludo = 'Buenas noches' }
  }
}
