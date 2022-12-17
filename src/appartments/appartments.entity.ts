import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
@Entity()
export class AppartmentsEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: number

    @Column()
    name: string

    @Column()
    city: string

    @Column()
    zip_code: string

    @Column()
    adress: string

    @Column()
    country: string

    @ManyToOne(() => BookingsEntity, bookings => bookings.appartments_id)
    bookings: BookingsEntity


}