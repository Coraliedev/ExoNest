import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EcoloGuard } from './ecolo/ecolo.guard';
import { GreenVehicles } from './green-vehicles/green-vehicles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('destination')
  @UseGuards(EcoloGuard)
  @GreenVehicles('legs', 'bike', 'horse', 'hands')
  travelToDestination(@Body('vehicle') vehicle: string) {
    console.log('travelToDestination');
    return `Have a good trip on your ${vehicle}`;
  }
}
