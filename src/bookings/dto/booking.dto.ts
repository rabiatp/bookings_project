import { plainToClass, Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

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