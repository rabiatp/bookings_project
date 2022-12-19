import { plainToClass, Transform, Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BookingsDTO } from "src/bookings/dto/booking.dto";
import { BookingsEntity } from "src/bookings/booking.entity";

export class ApartmentsDTO {

    @IsString()
    name: string

    @IsString()
    city: string

    @IsString()
    zipCode: string

    @IsString()
    apartmentAddress: string

    @IsString()
    country: string
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