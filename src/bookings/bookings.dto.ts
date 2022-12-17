import { plainToClass, Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { AppartmentsDTO } from "src/appartments/appartments.dto";
import { UsersDTO } from "src/users/users.dto";


export class BookingsDTO {
    @IsDate()
    starts_at: Date

    @IsDate()
    booked_at: Date

    @IsNumber()
    booked_for: number

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
    users_id: UsersDTO

    @ValidateNested()
    @Type(() => AppartmentsDTO)
    @Transform((object) => {
        if (object.type === 0) {
            object.value = plainToClass(
                AppartmentsDTO,
                object.value,
            );
        }
        return object.value;
    })
    appartments_id: AppartmentsDTO

}