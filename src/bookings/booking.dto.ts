import { plainToClass, Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { ApartmentsDTO } from "src/apartments/apartment.dto";
import { UsersDTO } from "src/users/user.dto";


export class BookingsDTO {
    @IsDate()
    startsAt: Date

    @IsDate()
    bookedAt: Date

    @IsNumber()
    bookedFor: number

    @IsBoolean()
    confirmed: boolean

    @ValidateNested()
    @Type(() => UsersDTO)
    @Transform((object) => {
        if (object.type === 0) {
            object.value = plainToClass(
                UsersDTO,
                object.value,
            );
        }
        return object.value;
    })
    user: UsersDTO[]

    @ValidateNested()
    @Type(() => ApartmentsDTO)
    @Transform((object) => {
        if (object.type === 0) {
            object.value = plainToClass(
                ApartmentsDTO,
                object.value,
            );
        }
        return object.value;
    })
    apartment: ApartmentsDTO[]

}