import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, ManyToOne, ObjectType, PrimaryColumn } from "typeorm";

@Entity()
export class UsersEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string

    @Column({ name: 'first_name' })
    firstName: string

    @Column({ name: 'last_name' })
    lastName: string

    @Column()
    phone: string

    @Column()
    email: string

    @ManyToOne(() => BookingsEntity, bookings => bookings.user)
    bookings: BookingsEntity

}