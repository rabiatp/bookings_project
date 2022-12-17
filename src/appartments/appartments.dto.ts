import { IsString } from "class-validator";

export class AppartmentsDTO {

    @IsString()
    name: string

    @IsString()
    city: string

    @IsString()
    zip_code: string

    @IsString()
    adress: string

    @IsString()
    country: string
}