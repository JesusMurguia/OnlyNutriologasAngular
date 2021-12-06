import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { Nutriologo } from '../models/nutriologo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3000/api/"

  constructor(
    private http:HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }


  login(user:Object){
    return this.http.post(`${this.URL}nutriologo/login`,user)
  }

  signupNutriologo(user:Object){
    return this.http.post(`${this.URL}nutriologo`,user)
  }

  signupPaciente(user:Object){
    return this.http.post(`${this.URL}cliente`,user)
  }


  getNutriologo(){
    const token = localStorage.getItem('token')!
    const decoded:Nutriologo = decode(token)
    return this.http.get<Nutriologo>(`${this.URL}nutriologo/${decoded._id}`)
  }

  isAuthenticated(){
    const token = localStorage.getItem('token')!
    if(this.jwtHelper.isTokenExpired(token) || !token){
      return false
    }
    return true
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  getClientes(){
    return this.http.get(`${this.URL}cliente`)
  }

  addClienteNutriologo(idCliente:string,idNutriologo:string){
    return this.http.post(`${this.URL}nutriologo/cliente`,{idCliente,idNutriologo})
  }

  getCliente(_id:string){
    return this.http.get(`${this.URL}cliente/${_id}`)
  }

  getDieta(_id:string){
    return this.http.get(`${this.URL}dieta/${_id}`)
  }

  getComida(_id:string){
    return this.http.get(`${this.URL}comida/${_id}`)
  }

  addDieta(dieta:any){
    return this.http.post(`${this.URL}dieta`,dieta)
  }

  addDietaNutriologo(dieta:any){
    return this.http.post(`${this.URL}nutriologo/dieta`,dieta)
  }

}


