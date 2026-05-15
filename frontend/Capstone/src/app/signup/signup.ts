import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentModel } from '../Models/StudentModel';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  student: StudentModel ={
    FullName: "",
    Email: "",
    Program: "",
    Institution: "",
    Resume: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: ""
  } ;

  signup(){
    console.log("Test \n"+ JSON.stringify(this.student) + " \nEnd ");
  }



}
