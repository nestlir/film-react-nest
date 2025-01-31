import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from '../../order/entities/schedule.service';
import { Schedule } from '../entities/schedule.entity';

@Controller('api/afisha/schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getAllSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getAllSchedules();
  }

  @Get(':id')
  async getScheduleById(@Param('id') id: string): Promise<Schedule | null> {
    return this.scheduleService.getScheduleById(id);
  }
}
