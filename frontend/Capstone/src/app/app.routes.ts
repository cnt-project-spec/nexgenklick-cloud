import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RegisterCompany } from './register-company/register-company';
import { CreateJobs } from './create-jobs/create-jobs';

export const routes: Routes = [
    {path: "signin", component: Login},
    {path: "register", component: Signup},
    {path: "registerCompany", component: RegisterCompany},
    {path: "createJob", component: CreateJobs}
];
