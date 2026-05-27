import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { InternModel } from '../Models/InternModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intern-details',
  imports: [],
  templateUrl: './intern-details.html',
  styleUrl: './intern-details.css',
})
export class InternDetails {
  intern: InternModel = new InternModel();

  constructor(private service: AppService, private route: ActivatedRoute ){

  }

  ngOnInit(): void{
    var jobId = this.route.snapshot.paramMap.get('id');
    this.intern=this.service.getInternDetails(jobId);

    console.log("Test \n"+ JSON.stringify(this.intern) + " \nEnd ");
  }

}
