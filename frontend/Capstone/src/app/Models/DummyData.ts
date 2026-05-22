import { JobModel } from "./JobModel";

export class DummyData{

    public JobsGenerator(): JobModel {

        return {
            Title: "Web Application Developer",
            Description: "develop web application using angular framework",
            Skills: "angular framework",
            Location: "Ottawa",
            Phone: "8327924809",
            WorkMode: "OnSite",
            StartDate: new Date(),
            EndDate: new Date,
            Deadline: new Date
        }
    }

}