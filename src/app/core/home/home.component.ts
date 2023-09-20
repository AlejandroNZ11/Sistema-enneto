import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public saludo = '';
  public routes = routes;
  public today = new Date();
  public currentHour = this.today.getHours();
  constructor(public auth:AuthService){}
  ngOnInit(): void {
    this.checkTime(this.currentHour);
    const token = this.auth.getAccessTokenSilently();
    console.log(token)
    }

  checkTime(i: number) {
    if (i >= 0 && i < 12) { this.saludo = 'Buenos días' }
    if (i >= 12 && i < 19) { this.saludo = 'Buenas tardes' }
    if (i >= 19) { this.saludo = 'Buenas noches' }
  }
}
