import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Nutriologo } from 'src/app/models/nutriologo';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {

  @Input() nutriologo!: Nutriologo;
  @Input() dietas:any[]=[];
  @Input() clientes:any[]=[];

  @Output() updateNutriologo = new EventEmitter<Nutriologo>();

  showSuccess:boolean=false;

  dieta:any={
    _id:null,
    caloriasDia:0,
    inicioFecha:"",
    finFecha:"",
    clienteId:"",
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }
  sendNutriologo(nutriologo: Nutriologo){
    this.updateNutriologo.emit(nutriologo);
  }


  addDieta(){
    this.authService.addDieta({
      caloriasDia:this.dieta.caloriasDia,
      inicioFecha:this.dieta.inicioFecha,
      finFecha:this.dieta.finFecha,
    }).subscribe((dieta:any)=>{
      this.authService.addDietaNutriologo({
        idNutriologo:this.nutriologo._id,
        idDieta:dieta._id,
        idCliente:this.dieta.clienteId
      }).subscribe(
        res=>{
          this.showSuccess=true;
          this.dietas.push(
            {
              dieta:dieta,
              cliente:this.clientes.find(cliente=>cliente._id==this.dieta.clienteId)
            }
          );
          this.nutriologo.dietas=this.dietas;
          this.sendNutriologo(this.nutriologo);
        }
      )
    })
  }

  editDieta(item:any){
    this.dieta={
      _id:item.dieta._id,
      caloriasDia:item.dieta.caloriasDia,
      inicioFecha: Date.parse(item.dieta.inicioFecha),
      finFecha: Date.parse(item.dieta.finFecha),
      clienteId:item.cliente._id,
      cliente:item.cliente.nombre,
    }
  }


  editDietaSave(){
    this.authService.editDieta(this.dieta._id,{
      caloriasDia:this.dieta.caloriasDia,
      inicioFecha:this.dieta.inicioFecha,
      finFecha:this.dieta.finFecha,
    }).subscribe(
      res=>{
        this.showSuccess=true;
        this.dietas.forEach((dieta,index)=>{
          if(dieta.dieta._id==this.dieta._id){
            this.dietas[index].dieta.caloriasDia=this.dieta.caloriasDia;
            this.dietas[index].dieta.inicioFecha=this.dieta.inicioFecha;
            this.dietas[index].dieta.finFecha=this.dieta.finFecha;
            this.dietas[index].cliente=this.clientes.find(cliente=>cliente._id==this.dieta.clienteId);
          }
        });
        this.sendNutriologo(this.nutriologo);
      });
    }

  formatDate(date:string){
    const options:any = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let fecha = new Date(date);
    return fecha.toLocaleDateString("es-ES", options);
  };
}
