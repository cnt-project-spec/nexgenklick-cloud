import { EmployerModel } from "./EmployerModel";

export class InternModel{
    Title!: string;
    Description!: string;
    Skills!: string;
    Location!: string;
    Phone!: string;
    WorkMode!: string;
    StartDate!: Date;
    EndDate?: Date;
    Deadline!: Date;
    Salary?: number;
    Type!: string;
    Company?: EmployerModel;
}