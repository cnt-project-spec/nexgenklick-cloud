export class UserModel{
    user_Id?: number;
    full_name!: string;
    is_active?: boolean;
    created_st?: Date;
    email!: string;
    password_hash?: string;
    role_id?:number;
    role?:string

}