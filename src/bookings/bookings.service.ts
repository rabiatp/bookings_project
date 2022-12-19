import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsEntity } from './booking.entity';
import { BookingsDTO } from './booking.dto';
import { UsersEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingsEntity)
        private bookingsRepository: Repository<BookingsEntity>,

    ) { }

    async createBooking(createBookings: BookingsDTO): Promise<BookingsEntity> {
        const { userId, apartmentId, startsAt, bookedAt, bookedFor, confirmed } = createBookings
        const booking: BookingsEntity = this.bookingsRepository.create({
            userId,
            apartmentId,
            startsAt,
            bookedAt,
            bookedFor,
            confirmed
        })
        try {
            await booking.save();
            return booking;
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getAll() {
        return await this.bookingsRepository.find();
    }
    async remove(id: string): Promise<void> {
        try {
            const result = await this.bookingsRepository.delete(id)
            if (result.affected === 0) {
                throw new NotFoundException(`Task with ID "${id}" not found`)
            }
        } catch (error) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }
}
