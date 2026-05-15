import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyModel } from '../Models/CompanyModel';

@Component({
  selector: 'app-register-company',
  imports: [FormsModule],
  templateUrl: './register-company.html',
  styleUrl: './register-company.css',
})
export class RegisterCompany {
  company:  CompanyModel ={
    Name: "",
    ContactPerson: "",
    Email: "",
    Phone: "",
    Industry: "",
    Address: "",
    Website: ""

  }

  register(){
    console.log("Test \n"+ JSON.stringify(this.company) + " \nEnd ");
  }

}
