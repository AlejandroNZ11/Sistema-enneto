import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  public routes = routes;
  public passwordClass = false;
  ngOnInit(): void {
    
  }
  constructor(public auth: AuthService, private router: Router) { }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
    const token =  this.auth.getAccessTokenSilently();
    console.log('Token de Acceso:', token);
  }
}
