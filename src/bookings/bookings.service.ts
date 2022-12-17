import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsEntity } from './booking.entity';
import { BookingsDTO } from './booking.dto';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingsEntity)
        private bookingsRepository: Repository<BookingsEntity>

    ) { }

    async createBooking(createBookingsDTO: BookingsDTO): Promise<any> {
        const {
            startsAt,
            bookedAt,
            bookedFor,
            apartment,
            user
        } = createBookingsDTO

        const booking: BookingsEntity = this.bookingsRepository.create({

            startsAt,
            bookedAt,
            bookedFor,
            apartment,
            user
        })

        try {

        } catch (error) {
            await booking.save()


        }
    }
}
