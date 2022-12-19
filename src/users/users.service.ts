import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingsEntity } from 'src/bookings/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { UsersDTO } from './user.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
        @InjectRepository(BookingsEntity)
        private bookingRepository: Repository<BookingsEntity>,
        private bookingService: BookingsService
    ) { }

    async create(createUser: UsersDTO) {
        const {
            firstName,
            lastName,
            phone,
            email,

        } = createUser
        const user: UsersEntity = this.userRepository.create({
            firstName,
            lastName,
            phone,
            email
        })
        try {
            await user.save()
            return user
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async findAll() {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: string): Promise<UsersEntity> {
        try {
            return this.userRepository.findOne({ where: { id: id } });
        } catch (error) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

    }

    async update(id: string, updateUser: UsersDTO): Promise<UpdateResult> {

        try {
            const update = await this.userRepository.update(id, {
                ...(updateUser.firstName && { firstName: updateUser.firstName }),
                ...(updateUser.lastName && { lastName: updateUser.lastName }),
                ...(updateUser.email && { email: updateUser.email }),
                ...(updateUser.phone && { phone: updateUser.phone }),

            })
            return update
        } catch (error) {
            throw new BadRequestException(error);

        }
    }


    async remove(id: string) {
        try {
            const result = await this.bookingRepository.findOne(
                {
                    where: {
                        userId: id,
                        confirmed: false
                    }
                })
            if (result.confirmed === false) {
                return await this.userRepository.delete(id)
            }
        } catch (error) {
            throw new NotFoundException(`Task with ID "${id}" not delete`)
        }
    }

}
