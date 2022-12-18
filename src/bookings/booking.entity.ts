import { IsNumber } from "class-validator"
import { ApartmentsEntity } from "src/apartments/apartment.entity"
import { UsersEntity } from "src/users/user.entity"
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class BookingsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    // @Column({ name: 'user_id' })
    // userId: string;

    @ManyToOne(() => UsersEntity, user_id => user_id.booking,
        {
            eager: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UsersEntity

    @CreateDateColumn({ type: 'date', name: 'starts_at' })
    startsAt: Date

    @CreateDateColumn({ type: 'date', name: 'booked_at' })
    bookedAt: Date

    @IsNumber()
    @Column({ name: 'booked_for' })
    bookedFor: number

    // @Column({ name: 'apartment_id' })
    // apartmentId: string;

    @ManyToOne(() => ApartmentsEntity, apartments_id => apartments_id.bookings,
        {
            eager: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    @JoinColumn({ name: 'apartment_id', referencedColumnName: 'id' })
    apartment: ApartmentsEntity[]

    @Column()
    confirmed: boolean
}