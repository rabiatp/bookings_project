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

    async createBooking(createBookings: BookingsDTO) {
        const { userId, apartmentId, startsAt, bookedAt, confirmed } = createBookings
        const date1: any = new Date(startsAt);
        const date2: any = new Date(bookedAt);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const bookedFor = diffDays

        const booking: BookingsEntity = this.bookingsRepository.create({
            userId,
            apartmentId,
            startsAt: date1,
            bookedFor,
            bookedAt: date2,
            confirmed
        })
        try {
            await booking.save();
            return booking;
        } catch (error) {
            console.log(error);

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

    async getFilter(searchParams: SearchParams) {

        console.log(searchParams);

        const {
            userName,
            userLastName,
            startAt,
            bookedAt,
            apartmentName,
            confirmed,
        } = searchParams


        const query = this.bookingsRepository
            .createQueryBuilder('bookings')
            .leftJoinAndSelect('bookings.user', 'user')
            .leftJoinAndSelect('bookings.apartment', 'apartment')
            .where('"starts_at" BETWEEN :startAt AND :bookedAt', { startAt: startAt, bookedAt: bookedAt })
            .andWhere('LOWER(user.first_name) LIKE LOWER(:userName)', { userName: `%${userName}%` })
            .andWhere('LOWER(user.last_name) LIKE LOWER(:userLastName)', { userLastName: `%${userLastName}%` })
            .orWhere('LOWER(apartment.name) LIKE LOWER(:apartmentName)', { apartmentName: `%${apartmentName}%` })
            .orWhere('bookings.confirmed = :confirmed', { confirmed: confirmed })
            .limit(11)

        return await query.getMany();

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
