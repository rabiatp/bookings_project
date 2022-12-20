import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BookingsDTO } from './dto/booking.dto';
import { BookingsService } from './bookings.service';
import { SearchParams } from './dto/filtering.dto';

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

    @Get('/getfilter')
    getFilter(@Query() searchParams: SearchParams) {
        return this.bookingService.getFilter(searchParams)
    }
}
