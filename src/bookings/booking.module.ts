import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsEntity } from 'src/apartments/apartment.entity';
import { UsersEntity } from 'src/users/user.entity';
import { BookingsController } from './booking.controller';
import { BookingsEntity } from './booking.entity';
import { BookingsService } from './bookings.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookingsEntity, ApartmentsEntity, UsersEntity])],
    controllers: [BookingsController],
    providers: [BookingsService]
})
export class BookingModule { }
