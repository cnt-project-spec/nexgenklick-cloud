import { JobModel } from "./JobModel";

export class DummyData{

    public JobsGenerator(): JobModel[] {
        const jobs: JobModel[] = [{
            Title: "Web Application Developer",
            Description: "develop web application using angular framework",
            Skills: "angular framework",
            Location: "Ottawa",
            Phone: "8327924809",
            WorkMode: "OnSite",
            StartDate: new Date("2026-07-01"),
            EndDate: new Date("2026-12-31"),
            Deadline:   new Date("2026-06-30")
        },
    
        {
            Title: "Web Application Tester",
            Description: "Test web application using angular framework",
            Skills: "angular framework",
            Location: "Ottawa",
            Phone: "8327924809",
            WorkMode: "OnSite",
            StartDate: new Date("2026-07-01"),
            EndDate: new Date("2026-12-31"),
            Deadline:   new Date("2026-06-30")
        },
    
        {
            Title: "Web Application Analyst",
            Description: "Analyze web application requirements using angular framework",
            Skills: "angular framework",
            Location: "Ottawa",
            Phone: "8327924809",
            WorkMode: "OnSite",
            StartDate: new Date("2026-07-01"),
            EndDate: new Date("2026-12-31"),
            Deadline:   new Date("2026-06-30")
        }];       

        return jobs;
    }

}