import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RegisterCompany } from './register-company/register-company';
import { CreateJobs } from './create-jobs/create-jobs';
import { Jobs } from './jobs/jobs';
import { Profile } from './profile/profile';
import { InternDetails } from './intern-details/intern-details';

export const routes: Routes = [
    {path: "signin", component: Login},
    {path: "register", component: Signup},
    {path: "registerCompany", component: RegisterCompany},
    {path: "createJob", component: CreateJobs},
    {path: "jobs", component: Jobs},
    {path: "profile", component: Profile},
    {path: "intern/:id", component: InternDetails}
];
