import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentModel } from '../Models/StudentModel';
import { UserModel } from '../Models/UserModel';
import { AppService } from '../app-service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  user: UserModel = new UserModel();

  constructor(private service: AppService){}

  signup(){
    console.log("Test \n"+ JSON.stringify(this.user) + " \nEnd ");
    this.service.registerUser(this.user).subscribe(res =>{
      console.log(res);
    })
  }



}
