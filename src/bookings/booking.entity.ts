import { ApartmentsEntity } from "src/apartments/apartment.entity"
import { UsersEntity } from "src/users/user.entity"
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany, JoinColumn } from "typeorm"

@Entity()
export class BookingsEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string

    @OneToMany(() => UsersEntity, user_id => user_id.bookings)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UsersEntity[]

    @Column({ type: 'date', name: 'starts_at' })
    startsAt: Date

    @Column({ type: 'date', name: 'booked_at' })
    bookedAt: Date

    @Column({ type: 'integer', name: 'booked_for' })
    bookedFor: number

    @OneToMany(() => ApartmentsEntity, apartments_id => apartments_id.bookings)
    @JoinColumn({ name: 'apartment_id', referencedColumnName: 'id' })
    apartment: ApartmentsEntity[]

    @Column()
    confirmed: boolean
}