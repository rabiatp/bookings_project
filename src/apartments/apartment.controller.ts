import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApartmentsDTO } from './apartment.dto';
import { ApartmentsService } from './apartment.service';

@Controller('apartment')
export class ApartmentsController {

    constructor(
        private readonly apartmentService: ApartmentsService,
    ) { }

    @Post()
    create(@Body() createApartmentDto: ApartmentsDTO) {
        return this.apartmentService.create(createApartmentDto);
    }

    @Get()
    findAll() {
        return this.apartmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.apartmentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: ApartmentsDTO) {
        return this.apartmentService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.apartmentService.remove(id);
    }

}
