import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { BookingsEntity } from './booking.entity';
import { BookingsDTO } from './booking.dto';
import { UsersEntity } from 'src/users/user.entity';

@Injectable()
export class BookingsService {

    constructor(
        @InjectRepository(BookingsEntity)
        private bookingsRepository: Repository<BookingsEntity>,

        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>

    ) { }

    async createBooking(userId: string, createBookings: BookingsDTO): Promise<BookingsEntity> {
        const { startsAt, bookedAt, bookedFor } = createBookings
        const booking: BookingsEntity = this.bookingsRepository.create({
            startsAt,
            bookedAt,
            bookedFor,
        })
        const newBooking = await this.bookingsRepository.save(booking)

        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['booking'] })
        user.booking.push(booking)

        await this.userRepository.save(booking)

        return newBooking


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
