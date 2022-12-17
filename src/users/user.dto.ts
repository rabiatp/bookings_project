import { IsString } from "class-validator";

export class UsersDTO {


    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    phone: string

    @IsString()
    email: string
}