import { Injectable } from '@angular/core';
import { InternModel } from './Models/InternModel';
import { DummyData } from './Models/DummyData';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './Models/UserModel';
import { Observable } from 'rxjs';
import { JitEvaluator, outputAst } from '@angular/compiler';

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

  //Regiter a user

  registerUser(user: UserModel): Observable<Object>{
    var userUrl=this.mainURl+"register";
    return this.http.post(userUrl, JSON.stringify(user)) ;

  }

  //get users
  getUSers(): Observable<Object>{
    var usersUrl=this.mainURl+"users";
    return this.http.get(usersUrl);
  }

  //posting interniship
  postInternship(intern: InternModel): Observable<Object>{
    var postInternUrl=this.mainURl+"internships";
    return this.http.post(postInternUrl, JSON.stringify(intern));
  }

  //get internships

  getIntens(): Observable<Object>{

    var internsUrl=this.mainURl+"internships";
    return this.http.get(internsUrl);
  }

  //apply intern
  applyIntern(userId: number, internId:number): Observable<Object> {
    var applyUrl=this.mainURl+"apply";

    return this.http.post(applyUrl, JSON.stringify({user_id: userId, internship_id: internId}));
  }

  // get all applications
  getApplications(): Observable<Object>{
    var applicationsUrl= this.mainURl+"applications";

    return this.http.get(applicationsUrl);
  }

  //update application status 
  updateApplicationStatus(userId:number, status:string){

    var statusUrl=this.mainURl+"application/:"+userId+"/"+status;
    return this.http.put(statusUrl, JSON.stringify({user_id: userId, status: status}));
  }

  //delete Application
  deleteApplication(applicationId: number): Observable<Object> {
    var deleteUrl= this.mainURl+"application/:"+applicationId;
    return this.http.delete(deleteUrl);
  }

  //login
  login(email: string): Observable<Object>{

    var loginURl= this.mainURl+"login";
    return this.http.post(loginURl, JSON.stringify({email: email}));
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
