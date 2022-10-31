import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class EcoloGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const greenVehicles = this.reflector.get<string[]>(
      'greenVehicle',
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const isGreenVehicle = greenVehicles.includes(req.body.vehicle);
    const request = context.switchToHttp().getRequest();
    if (!isGreenVehicle) {
      return false;
    }
    return true;
  }
}
