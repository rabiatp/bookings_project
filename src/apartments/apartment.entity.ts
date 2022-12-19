import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class ApartmentsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    city: string

    @Column({ name: 'zip_code' })
    zipCode: string

    @Column({ name: 'address' })
    apartmentAddress: string

    @Column()
    country: string

    @OneToMany(() => BookingsEntity, bookings => bookings.apartment,
        {
            eager: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    booking: BookingsEntity[]


}