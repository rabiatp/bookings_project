import { plainToClass, Transform, Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BookingsEntity } from "src/bookings/booking.entity";

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

    @ValidateNested()
    @Type(() => BookingsEntity)
    @Transform((object) => {
        if (object.type === 0) {
            object.value = plainToClass(
                BookingsEntity,
                object.value,
            );
        }
        return object.value;
    })
    booking: BookingsEntity
}