import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, ManyToOne, ObjectType, PrimaryColumn } from "typeorm";

@Entity()
export class UsersEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    phone: string

    @Column()
    email: string

    @ManyToOne(() => BookingsEntity, bookings => bookings.user_id)
    bookings: BookingsEntity

}