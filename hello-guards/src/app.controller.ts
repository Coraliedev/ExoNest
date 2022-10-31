import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { EcoloGuard } from './ecolo/ecolo.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('destination')
  @UseGuards(EcoloGuard)
  @SetMetadata('greenVehicle', ['legs', 'bike', 'horse'])
  travelToDestination(@Body('vehicle') vehicle:string){
    console.log('travelToDestination');
    return `Have a good trip in your ${vehicle}`;
  }
}
