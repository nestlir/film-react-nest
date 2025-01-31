import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../films/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  getScheduleById(id: string): Schedule | PromiseLike<Schedule> {
    throw new Error('Method not implemented.');
  }
  getAllSchedules(): Schedule[] | PromiseLike<Schedule[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findScheduleById(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({ where: { id } });
  }
}
