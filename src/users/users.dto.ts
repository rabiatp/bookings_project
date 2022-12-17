import { IsDate, IsNumber, IsString } from "class-validator";

export class UsersDTO {


    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsString()
    phone: string

    @IsString()
    email: string
}