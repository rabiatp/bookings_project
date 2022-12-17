import { AppartmentsEntity } from "src/appartments/appartments.entity"
import { UsersEntity } from "src/users/users.entity"
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm"

@Entity()
export class BookingsEntity extends BaseEntity {
    @PrimaryColumn('uuid')
    id: number

    @OneToMany(() => UsersEntity, user_id => user_id.bookings)
    users_id: UsersEntity

    @Column('date')
    starts_at: Date

    @Column('date')
    booked_at: Date

    @Column('integer')
    booked_for: number

    @OneToMany(() => AppartmentsEntity, apartment_id => apartment_id.bookings)
    appartments_id: AppartmentsEntity

    @Column()
    confirmed: number
}