import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternModel } from '../Models/InternModel';

@Component({
  selector: 'app-create-jobs',
  imports: [FormsModule],
  templateUrl: './create-jobs.html',
  styleUrl: './create-jobs.css',
})
export class CreateJobs {
  job: InternModel = new InternModel();

  Post(){
    console.log("Test \n"+ JSON.stringify(this.job) + " \nEnd ");
  }

}
