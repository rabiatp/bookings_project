import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsEntity } from './booking.entity';
import { BookingsDTO } from './bookings.dto';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingsEntity)
        private bookingsRepository: Repository<BookingsEntity>

    ) { }

    async createBooking(createBookingsDTO: BookingsDTO) {
        const {
            starts_at,
            booked_at,
            booked_for,
            appartments_id,
            users_id
        } = createBookingsDTO

        const booking: BookingsEntity = this.bookingsRepository.create({
            starts_at,
            booked_at,
            booked_for,
            appartments_id,
            users_id
        })
    }
}
