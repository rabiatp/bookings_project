import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsService } from './bookings/bookings.service';

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
   
  ],
  controllers: [AppController, BookingsController],
  providers: [AppService, BookingsService],
})
export class AppModule {}
