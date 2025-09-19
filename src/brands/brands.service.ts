import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

    private brands: Brand[] = [
        {
            id: uuid(),
            name: 'Toyota',
            createAt: new Date().getTime(),
        },
        {
            id: uuid(),
            name: 'Honda',
            createAt: new Date().getTime(),
        },
        {
            id: uuid(),
            name: 'Ford',
            createAt: new Date().getTime(),
        }
    ];

    create(createBrandDto: CreateBrandDto) {

        const { name } = createBrandDto;

        const brand: Brand = {
            id: uuid(),
            name: name.toLocaleLowerCase(),
            createAt: new Date().getTime(),
        }

        this.brands.push( brand );
        return brand;
    }

    findAll() {
        return this.brands;
    }

    findOne(id: string) {
        const brand = this.brands.find( brand => brand.id === id );
        if ( !brand ) throw new NotFoundException(`Brand with id '${id}' not found`);
        return brand;
    }

    update(id: string, updateBrandDto: UpdateBrandDto) {
        let brandDb = this.findOne( id );
        this.brands = this.brands.map( brand => {
            if ( brand.id === id ) {
                brandDb.updateAt = new Date().getTime();
                brandDb = { ...brandDb, ...updateBrandDto, id }
                return brandDb;
            }
            return brand;
        });
        return brandDb;
    }

    remove(id: string) {
        this.brands = this.brands.filter( brand => brand.id !== id );
    }
}
