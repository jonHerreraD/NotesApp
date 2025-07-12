import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoginResponse} from '../../model/interface/user';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onLogin(){
    //debugger;
    if (this.loginForm.valid){
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (res: LoginResponse) => {
          if (res.token){
            alert("Logged in successfully");
            localStorage.setItem('token', res.token);
            this.router.navigate(['/notes']);
          }else{
            alert("Login failed");
          }
        },
        error:(err) =>{
          console.error("Login error: ", err);
          alert("Login failed: " + err.message);
        }
      });
    }
  }


}
