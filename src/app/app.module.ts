import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { FormsModule } from '@angular/forms';
import { TablaComponent } from './common-component/tabla/tabla.component';
import { TablaModule } from './common-component/tabla/tabla.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule ,
    TablaModule,
    AuthModule.forRoot({
      domain: env.domain,
      clientId: env.clientId,
      authorizationParams: {
        audience: env.audience,
        redirect_uri: window.location.origin + '/home'
      },
      httpInterceptor: {
        allowedList: [`${env.apiURL}/*`]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthHttpInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
