import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { ProfileModel } from '../Models/ProfileModel';
import { InternModel } from '../Models/InternModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profile: ProfileModel = new ProfileModel();
  intern: InternModel[] = [];
  constructor(private appService: AppService){}
  ngOnInit(): void{

    this.profile = this.appService.getProfile(1) ;
    this.intern= this.appService.GetJobs();  

    console.log("Test \n"+ JSON.stringify(this.intern) + " \nEnd ");
  }
}
