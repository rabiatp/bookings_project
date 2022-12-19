import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    createBooking(@Body() createBooking: BookingsDTO) {
        return this.bookingService.createBooking(createBooking);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookingService.remove(id);
    }
}
