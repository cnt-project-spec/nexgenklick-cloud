import { Component } from '@angular/core';
import { AppService } from '../app-service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(private appService: AppService){}
  ngOnInit(): void{
    console.log("Test \n"+ JSON.stringify(this.appService.GetJobs()) + " \nEnd ");
  }
}
