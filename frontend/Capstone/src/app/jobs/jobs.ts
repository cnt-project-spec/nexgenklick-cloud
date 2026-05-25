import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { InternModel } from '../Models/InternModel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css',
})
export class Jobs {
  jobs: InternModel[] =[];
  constructor(private appService: AppService) {}

  ngOnInit(): void{
    console.log("Component initialized");
    this.jobs= this.appService.GetJobs()

    console.log("Test \n"+ JSON.stringify(this.jobs) + " \nEnd ");
    // getJobs
  }
}
