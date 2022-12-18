import { BookingsEntity } from "src/bookings/booking.entity";
import { BaseEntity, Column, Entity, ManyToOne, ObjectType, OneToMany, PrimaryColumn } from "typeorm";

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

    @Column({ unique: true })
    email: string

    @OneToMany(() => BookingsEntity, bookings => bookings.user,
    {   eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    booking: BookingsEntity[]

}