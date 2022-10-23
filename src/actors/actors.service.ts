import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actors } from './models/actors.model';

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actors) private actorsRepository: typeof Actors) {}

  async getActors(name?: string) {
    const actors = await this.actorsRepository.findAll({
      where: {
        name: {
          [Op.like]: '%' + (name || '') + '%',
        },
      },
    });
    return actors;
  }

  async create(dto: CreateActorDto) {
    try {
      const actor = await this.actorsRepository.create(dto);
      return actor;
    } catch (err) {
      const [error] = err.errors;
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async delete(id: number) {
    const actor = await this.actorsRepository.destroy({
      where: { actor_id: id },
    });
    return actor;
  }
}
