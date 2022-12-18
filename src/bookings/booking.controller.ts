import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { BookingsDTO } from './booking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {

    constructor(
        private bookingService: BookingsService

    ) { }

    @Get()
    getAll() {
        return this.bookingService.getAll();
    }

    @Post()
    createBooking(@Param('id') userId, @Body() createBooking: BookingsDTO) {
        return this.bookingService.createBooking(userId, createBooking);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookingService.remove(id);
    }
}
