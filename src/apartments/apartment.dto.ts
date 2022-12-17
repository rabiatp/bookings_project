import { IsString } from "class-validator";

export class ApartmentsDTO {

    @IsString()
    name: string

    @IsString()
    city: string

    @IsString()
    zipCode: string

    @IsString()
    address: string

    @IsString()
    country: string
}