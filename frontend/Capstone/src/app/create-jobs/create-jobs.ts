import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobModel } from '../Models/JobModel';

@Component({
  selector: 'app-create-jobs',
  imports: [FormsModule],
  templateUrl: './create-jobs.html',
  styleUrl: './create-jobs.css',
})
export class CreateJobs {
  job: JobModel= new JobModel();

  Post(){
    console.log("Test \n"+ JSON.stringify(this.job) + " \nEnd ");
  }

}
