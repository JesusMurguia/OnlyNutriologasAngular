import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Nutriologo } from 'src/app/models/nutriologo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numClientes:number=0;
  numDietas:number=0;
  numComidas:number=0;
  nombre:string="nombreusuario";
  nutriologo!: Nutriologo;

  clientesActive:boolean=true;
  dietasActive:boolean=false;

  receiveNutriologo(nutriologo: Nutriologo){
    this.nutriologo=nutriologo;
    this.nutriologo = nutriologo;
    this.numClientes = nutriologo.clientes.length;
    this.numDietas = nutriologo.dietas.length;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.getNutriologo().subscribe(
      (nutriologo: Nutriologo) => {
        this.nutriologo = nutriologo;
        this.numClientes = nutriologo.clientes.length;
        this.numDietas = nutriologo.dietas.length;
        this.nombre = nutriologo.nombre;
      }
    );

  }

  handleNav(nav:string){
    switch(nav){
      case 'clientes':
        this.clientesActive=true;
        this.dietasActive=false;
        break;
      case 'dietas':
        this.clientesActive=false;
        this.dietasActive=true;
        break;
    }
  }

  
}
