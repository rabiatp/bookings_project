import { IsNumber } from "class-validator"
import { ApartmentsEntity } from "src/apartments/apartment.entity"
import { UsersEntity } from "src/users/user.entity"
import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from "typeorm"

@Entity()
export class BookingsEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column({ nullable: true, name: 'user_id' })
    userId: string;

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

    @Column({ name: 'booked_for' })
    bookedFor?: number




    @Column({ nullable: true, name: 'apartment_id' })
    apartmentId: string;

    @ManyToOne(() => ApartmentsEntity, apartment => apartment.booking,
        {
            eager: false,
            cascade: true,
            onDelete: 'CASCADE',
        })
    @JoinColumn({ name: 'apartment_id', referencedColumnName: 'id' })
    apartment: ApartmentsEntity[]

    @Column()
    confirmed: boolean
}