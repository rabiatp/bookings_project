import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { BookingsEntity } from 'src/bookings/booking.entity';
import { ApartmentsEntity } from 'src/apartments/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      BookingsEntity
    ])],
  controllers: [UsersController],
  providers: [UsersService, BookingsService]
})
export class UsersModule { }
