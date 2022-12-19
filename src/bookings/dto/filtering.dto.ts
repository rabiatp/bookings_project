import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchParams {
    @IsOptional()
    @IsString()
    userName: string

    @IsOptional()
    @IsString()
    userLastName: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startAt: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    bookedAt: Date

    @IsOptional()
    @IsString()
    apartmentName: string

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    confirmed: boolean
}