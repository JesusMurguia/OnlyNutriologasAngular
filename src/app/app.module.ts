import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import { NutriologoComponent } from './components/signup/nutriologo/nutriologo.component';
import { PacienteComponent } from './components/signup/paciente/paciente.component';
import { ClientesComponent } from './components/home/clientes/clientes.component';
import { DietasComponent } from './components/home/dietas/dietas.component';
import { DatepickerModule } from 'ng2-datepicker';
import { CardDeckComponent } from './components/card-deck/card-deck.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    NutriologoComponent,
    PacienteComponent,
    ClientesComponent,
    DietasComponent,
    CardDeckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DatepickerModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
