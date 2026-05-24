import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../Models/UserModel';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  logIn: UserModel =new UserModel();

  login(){
    console.log("Test \n"+ JSON.stringify(this.logIn) + " \nEnd ");
  }
}
