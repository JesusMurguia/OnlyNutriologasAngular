import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Nutriologo } from 'src/app/models/nutriologo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @Input() nutriologo!: Nutriologo;
  @Output() updateNutriologo = new EventEmitter<Nutriologo>();

  errorMessage: string="";
  successMessage: string="";

  cliente:any={
    email: '',
  }

  clientes:any[]=[];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnChanges(){
    if(this.nutriologo){
      this.clientes=[];
      this.nutriologo?.clientes.forEach((cliente: any)=>{ 
        this.authService.getCliente(cliente).subscribe(
          (data:any) => {
            this.clientes.push(data);
          }
        )
      });
    }
  }

  ngOnInit(): void {
    
  }


  sendNutriologo(nutriologo: Nutriologo){
    this.updateNutriologo.emit(nutriologo);
  }


  isClienteInNutriologo(cliente: any,nutriologo: Nutriologo){

    let isClienteInNutriologo=false;

    nutriologo.clientes.forEach((clienteNutriologo: any)=>{
      if(cliente._id==clienteNutriologo){
        isClienteInNutriologo=true;
      }
    });
    return isClienteInNutriologo;
  }

  


  addCliente(){
    this.errorMessage= "";
    this.successMessage= "";
    this.authService.getClientes().subscribe(
      (data:any)=>{

        let clienteExists=false;
        data.forEach((cliente: any)=>{
          if(cliente.email == this.cliente.email){
            clienteExists=true;
            if(this.isClienteInNutriologo(cliente,this.nutriologo)){
              this.errorMessage="Esta persona ya es cliente de este nutriologo";
            }else{
            this.authService.addClienteNutriologo(cliente._id, this.nutriologo._id).subscribe(
              (data:any)=>{
                this.successMessage="Cliente agregado con exito";
                this.cliente.email="";
                this.authService.getNutriologo().subscribe(
                  (data:any)=>{
                    this.sendNutriologo(data);
                  }
                );
              }
            )
          }
          }
        });
        if(!clienteExists){
          this.errorMessage="No existe un cliente con ese email";
        }
    })
  }
}
