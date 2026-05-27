import { Injectable } from '@angular/core';
import { InternModel } from './Models/InternModel';
import { DummyData } from './Models/DummyData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private dummyData= new DummyData;
  private mainURl= "http://localhost:3000/";
  
  constructor(private http:HttpClient){}

  ConnectBackend(): void{
    this.http.get(this.mainURl, { responseType: 'text' }).subscribe(res => {
      console.log(res);
    })

  }

  getUsers(): any{
    var usersUrl= this.mainURl+"users";

    this.http.get(usersUrl).subscribe(res =>{
      console.log(res);
    })

  }

  GetJobs(): InternModel[]{
    var jobsUrl=this.mainURl+"/api/jobs"

    
    //HTTP Request
    // /api/jobs method GET
    var response=this.http.get(jobsUrl);
    // if(response)
    
    return this.dummyData.JobsGenerator()
  }

  getProfile(userId:number){
      var profileUrl=this.mainURl+"/api/profile/"+userId;

      var profile=this.dummyData.ProfileGenerator();

      return profile;
      
  }

  getInternDetails(internId: any): InternModel{
    var internUrl= this.mainURl+"/api/aplication/{"+internId+"}/status";
    console.log("Test intern ID "+ internId);
    // this.http.get(internUrl)

    return this.dummyData.JobsGenerator()[1];

  }
}
