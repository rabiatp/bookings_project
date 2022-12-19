import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { BookingsEntity } from './booking.entity';
import { BookingsDTO } from './dto/booking.dto';
import { UsersEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SearchParams } from './dto/filtering.dto';
import { query } from 'express';

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
        const result = await this.bookingsRepository
            .createQueryBuilder('bookings')
            .leftJoin('bookings.user', 'user')
            .leftJoin('bookings.apartment', 'apartment')
            .addSelect(['user', 'apartment'])
            .getOne()
        return result;
    }

    async getFindOne(searchParams: SearchParams) {
        const {
            userName,
            userLastName,
            startAt,
            bookedAt,
            apartmentName,
            confirmed,
        } = searchParams

        const newquery = this.bookingsRepository
            .createQueryBuilder('bookings')
            .leftJoin('bookings.user', 'user')
            .leftJoin('bookings.apartment', 'apartment')
            .andWhere('"startAt" BETWEEN :startAt AND :bookedAt', { startAt: startAt, bookedAt: bookedAt })
            .addSelect(['user', 'apartment'])

        const result = newquery.andWhere(
            `(LOWER(user.first_name) LIKE LOWER(:userName) 
                AND LOWER(user.last_name) LIKE LOWER(:userLastName)
                AND LOWER(apartment.name) LIKE LOWER(:apartmentName)
                AND LOWER(bookings.confirmed) LIKE LOWER(:confirmed)
                )`,
            {
                userName,
                userLastName,
                apartmentName,
                confirmed
            }
        )
        return result.getMany();

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
