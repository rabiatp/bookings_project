import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsEntity } from 'src/apartments/apartment.entity';
import { ApartmentsModule } from 'src/apartments/apartment.module';
import { ApartmentsService } from 'src/apartments/apartment.service';
import { UsersEntity } from 'src/users/user.entity';
import { UsersModule } from 'src/users/user.module';
import { UsersService } from 'src/users/users.service';
import { BookingsController } from './booking.controller';
import { BookingsEntity } from './booking.entity';
import { BookingsService } from './bookings.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BookingsEntity,
            ApartmentsEntity,
            UsersEntity
        ])
        // forwardRef(() => UsersModule),
        //forwardRef(() => ApartmentsModule),

    ],
    exports: [ApartmentsService],
    controllers: [BookingsController],
    providers: [BookingsService, ApartmentsService, UsersService]
})
export class BookingModule { }
