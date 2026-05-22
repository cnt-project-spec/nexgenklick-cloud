import { Component } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  jobs: any;
  constructor(private appService: AppService) {}

  ngOnInit(): void{
    console.log("Component initialized");
    this.jobs= this.appService.GetJobs()

    console.log("Test \n"+ JSON.stringify(this.jobs) + " \nEnd ");
    // getJobs
  }
}
