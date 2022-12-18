import { plainToClass, Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, ValidateNested } from "class-validator";
import { BookingsDTO } from "src/bookings/booking.dto";
import { BookingsEntity } from "src/bookings/booking.entity";

export class UsersDTO {


    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    // @Matches(/^\+[1-9]\d{1,14}$/)
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string

    @ValidateNested()
    @Type(() => BookingsDTO)
    @Transform((object) => {
        if (object.type === 0) {
            object.value = plainToClass(
                BookingsDTO,
                object.value,
            );
        }
        return object.value;
    })
    booking: BookingsDTO
}