import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-nutriologo',
  templateUrl: './nutriologo.component.html',
  styleUrls: ['./nutriologo.component.css']
})
export class NutriologoComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = "";

  nutriologo = {
    nombre: "",
    genero: "",
    email: "",
    password: "",
    edad: "",
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.showError = false;
    this.authService.signupNutriologo(this.nutriologo).subscribe(
      (response: any) => {
        alert("Nutriologo creado exitosamente");
         this.router.navigate(['/login']);
      },
      (error: any) => {
        this.errorMessage = error.error;
        this.showError = true;
      }
    );
  }

}
