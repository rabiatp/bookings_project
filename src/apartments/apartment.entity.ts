import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
@Entity()
export class ApartmentsEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    city: string

    @Column({ name: 'zip_code' })
    zipCode: string

    @Column({ name: 'address' })
    address: string

    @Column()
    country: string

    @ManyToOne(() => BookingsEntity, bookings => bookings.apartment)
    bookings: BookingsEntity


}