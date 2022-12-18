import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingsService } from 'src/bookings/bookings.service';
import { Repository } from 'typeorm';
import { UsersDTO } from './user.dto';
import { UsersEntity } from './user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) { }

  async create(createUser: UsersDTO) {
    const {
      firstName,
      lastName,
      phone,
      email,
      booking
    } = createUser
    const user: UsersEntity = await this.create({
      firstName,
      lastName,
      phone,
      email,
      booking
    })
    try {
      await user.save()
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll() {
    return await this;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UsersDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
