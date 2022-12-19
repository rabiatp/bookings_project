import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingsEntity } from 'src/bookings/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';
import { Repository } from 'typeorm';
import { ApartmentsDTO } from './apartment.dto';
import { ApartmentsEntity } from './apartment.entity';

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectRepository(ApartmentsEntity)
        private readonly apartmentRepository: Repository<ApartmentsEntity>,
        @InjectRepository(BookingsEntity)
        private readonly bookingRepository: Repository<BookingsEntity>,
        public bookingService: BookingsService
    ) { }

    async create(createApartment: ApartmentsDTO) {
        const {
            name,
            city,
            zipCode,
            apartmentAddress,
            country
        } = createApartment

        const apartment: ApartmentsEntity = await this.apartmentRepository.create({
            name,
            city,
            zipCode,
            apartmentAddress,
            country
        })
        try {
            await apartment.save()
            return apartment
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll() {
        try {
            return await this.apartmentRepository.find()
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: string): Promise<ApartmentsEntity> {
        try {
            return this.apartmentRepository.findOne({ where: { id: id } })
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async update(id: string, apartment: ApartmentsDTO) {
        try {
            const update = await this.apartmentRepository.update(id, {
                ...(apartment.name && { name: apartment.name }),
                ...(apartment.zipCode && { zipCode: apartment.zipCode }),
                ...(apartment.country && { country: apartment.country }),
                ...(apartment.city && { city: apartment.city }),
                ...(apartment.apartmentAddress && { apartmentAddress: apartment.apartmentAddress }),
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
                        apartmentId: id,
                        confirmed: false
                    }
                })
            if (result.confirmed === false) {
                return await this.apartmentRepository.delete(id)
            }
        } catch (error) {
            throw new NotFoundException(`Task with ID "${id}" not delete`)
        }
    }

}
