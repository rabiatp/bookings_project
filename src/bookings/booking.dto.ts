import { plainToClass, Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApartmentsDTO } from "src/apartments/apartment.dto";
import { UsersDTO } from "src/users/user.dto";


export class BookingsDTO {
    @IsString()
    @IsOptional()
    userId?: string

    @IsString()
    @IsOptional()
    apartmentId?: string

    @IsDate()
    startsAt: Date

    @IsDate()
    bookedAt: Date

    @IsNumber()
    bookedFor: number

    @IsBoolean()
    confirmed: boolean
}