import { Component, OnInit} from '@angular/core';
import { Nutriologo } from 'src/app/models/nutriologo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientes:any[]=[];
  dietas:any[]=[];
  numClientes:number=0;
  numDietas:number=0;
  numComidas:number=0;
  nombre:string="nombreusuario";
  nutriologo!: Nutriologo;

  clientesActive:boolean=false;
  dietasActive:boolean=true;

  receiveNutriologo(nutriologo: Nutriologo){
    this.nutriologo=nutriologo;
    this.nutriologo = nutriologo;
    this.numClientes = nutriologo.clientes.length;
    this.numDietas = nutriologo.dietas.length;
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getNutriologo().subscribe(
      (nutriologo: Nutriologo) => {
        this.nutriologo = nutriologo;
        this.numClientes = nutriologo.clientes.length;
        this.numDietas = nutriologo.dietas.length;
        this.nombre = nutriologo.nombre;
      }
    ).add(()=>{
      if(this.nutriologo){
        this.clientes=[];
        this.nutriologo?.clientes.forEach((cliente: any)=>{ 
          
          this.authService.getCliente(cliente).subscribe(
            (data:any) => {
              this.clientes.push(data);
              data.dietas.forEach((dieta:any)=>{
                let tmpcliente = data;
                this.authService.getDieta(dieta).subscribe(
                  (data:any) => {
                    this.numComidas += data.comidas.length;
                    this.dietas.push({  
                      cliente: tmpcliente,
                      dieta: data
                    });
                  }
                )
              });
            }
          )
        });
      }
    });
  }

  receiveComida(comida:number){
    this.numComidas = comida;
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
