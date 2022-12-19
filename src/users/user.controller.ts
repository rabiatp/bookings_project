import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { connection } from 'mongoose';
import { QueryBuilder } from 'typeorm';
import { UsersDTO } from './user.dto';
import { UsersEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    create(@Body() createUserDto: UsersDTO) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUser: UsersDTO) {
        return this.usersService.update(id, updateUser);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

}
