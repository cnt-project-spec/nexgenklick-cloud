import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../Models/Login';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  logIn: LoginModel =new LoginModel();

  login(){
    console.log("Test \n"+ JSON.stringify(this.logIn) + " \nEnd ");
  }
}
