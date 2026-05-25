import { EmployerModel } from "./EmployerModel";
import { InternModel } from "./InternModel";
import { ProfileModel } from "./ProfileModel";

export class DummyData{

    public JobsGenerator(): InternModel[] {
        const jobs: InternModel[] = [{
            Title: "Web Application Developer",
            Description: "develop web application using angular framework",
            Skills: "angular framework",
            Location: "Ottawa",
            Phone: "8327924809",
            WorkMode: "OnSite",
            StartDate: new Date("2026-07-01"),
            EndDate: new Date("2026-12-31"),
            Deadline:   new Date("2026-06-30"),
            Salary: 80000,
            Type: "Full-Time",
            Company: this.CompanyGenerator(),
            InternID: 932,
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
            Deadline:   new Date("2026-06-30"),
            Salary: 70000,
            Type: "Part-Time",
            Company: this.CompanyGenerator(),
            InternID: 1234
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
            Deadline:   new Date("2026-06-30"), 
            Salary: 90000,
            Type: "Contract",
            Company: this.CompanyGenerator(),
            InternID: 236475
        }];       

        return jobs;
    }

    public CompanyGenerator(): EmployerModel{
        return {
            Name: "ABC Company",
            ContactPerson: "John Doe",
            Email: "john.doe@abccompany.com",
            Phone: "8327924809",
            Industry: "Information Technology",
            Address: "123 Main Street, Ottawa, ON",
            Website: "www.abccompany.com"
        }
    }

    public ProfileGenerator(): ProfileModel{
        return {
            student: {
                student_Id: 1,
                FullName: "Jane Doe",
                Email: "jane.doe@example.com",
                Program: "Computer Science",
                Institution: "University of Ottawa",
                PhoneNumber: "123-456-7890",
                Resume: "https://example.com/resume/jane-doe"
            },
            user: {
                user_Id: 1,
                Full_Name: "Jane Doe",
                is_Acive: true,
                created_st: new Date("2026-01-01"),
                Email: "jane.doe@example.com"
            }
        }
    }
 
}