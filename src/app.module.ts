import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsEntity } from './apartments/apartment.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsController } from './bookings/booking.controller';
import { BookingsService } from './bookings/bookings.service';
import { UsersEntity } from './users/user.entity';
import { BookingModule } from './bookings/booking.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'psql-mock-database-cloud.postgres.database.azure.com',
      port: 5432,
      username: 'kiyljxzidwphfnddnbsztzdj@psql-mock-database-cloud',
      password: 'nopxoebwfrrbnkiafvrsrqnc',
      database: 'websites1671180840056xjxyzqbmdhmsbvna',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

    }),
    ApartmentsEntity,
    UsersEntity,
    BookingModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
