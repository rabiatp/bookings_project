import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsEntity } from './apartment.entity';
import { ApartmentsController } from './apartment.controller';
import { ApartmentsService } from './apartment.service';
import { BookingsEntity } from 'src/bookings/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';
import { BookingModule } from 'src/bookings/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApartmentsEntity,
      BookingsEntity
    ])
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, BookingsService]
})
export class ApartmentsModule { }
