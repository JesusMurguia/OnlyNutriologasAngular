import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError: boolean = false;
  errorMessage: string = "";

  user ={ 
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }
  

  ngOnInit() {
  }


  logIn() {
    this.showError = false;
    this.authService.login(this.user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.errorMessage = error.error;
        this.showError = true;
      }
    );
  }

  mostrarAlerta():boolean{
    return true;
  }
}

