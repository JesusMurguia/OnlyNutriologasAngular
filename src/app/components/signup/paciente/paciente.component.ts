import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  showError: boolean = false;
  errorMessage: string = "";

  paciente = {
    nombre: "",
    edad: "",
    genero: "",
    peso: "",
    estatura: "",
    email: "",
    password: "",
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.showError = false;
    this.authService.signupPaciente(this.paciente).subscribe(
      (response: any) => {
        alert("Paciente creado exitosamente");
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.errorMessage = error.error;
        this.showError = true;
      }
    );
  }

}
