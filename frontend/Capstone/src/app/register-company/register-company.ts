import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployerModel } from '../Models/EmployerModel';

@Component({
  selector: 'app-register-company',
  imports: [FormsModule],
  templateUrl: './register-company.html',
  styleUrl: './register-company.css',
})
export class RegisterCompany {
  company:  EmployerModel = new EmployerModel();

  register(){
    console.log("Test \n"+ JSON.stringify(this.company) + " \nEnd ");
  }

}
