import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../Models/UserModel';
import { AppService } from '../app-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  logIn: UserModel =new UserModel();
  
  constructor(private service: AppService) {}

  login(){
    console.log("Test \n"+ JSON.stringify(this.logIn) + " \nEnd ");

    this.service.login(this.logIn.email).subscribe({
      next: (res)=>{
        console.log(res)
      },

      error: (err)=>{
        console.log(err)
      }

    });

  }
}
