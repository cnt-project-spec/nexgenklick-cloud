import { Injectable } from '@angular/core';
import { JobModel } from './Models/JobModel';
import { DummyData } from './Models/DummyData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private dummyData= new DummyData;
  private mainURl= "https://localhost:4200";
  
  constructor(private http:HttpClient){}
  GetJobs(): JobModel{
    var jobsUrl=this.mainURl+"/api/jobs"

    
    //HTTP Request
    // /api/jobs method GET
    var response=this.http.get(jobsUrl);
    // if(response)
    
    return this.dummyData.JobsGenerator()
  }
}
