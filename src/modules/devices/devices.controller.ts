import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cookies } from '../auth/decorators/cookies';
import { GetAlldevicesCommand } from './use-cases/getAlldevices';
import { DeleteAlldevicesCommand } from './use-cases/deleteAlldevices';
import { DeleteAllDevicesByDeviceIdCommand } from './use-cases/deleteAllDevicesByDeviceId';
import { Devices } from '@prisma/client';
import { ApiFindAllDevicesSwagger } from '../../../swagger/Devices/api-find-all-devices';
import { ApiDeleteAllDevicesSwagger } from '../../../swagger/Devices/api-delete-all-devices';
import { ApiDeleteDeviceByIdSwagger } from '../../../swagger/Devices/api-delete-device-by-id';

@ApiTags('Devices')
@Controller('security')
export class DevicesController {
  constructor(public command: CommandBus) {}

  @Get('devices')
  @ApiFindAllDevicesSwagger()
  async getAllDevices(@Cookies() cookies): Promise<Devices[]> {
    return this.command.execute(new GetAlldevicesCommand(cookies.refreshToken));
  }

  @Delete('devices')
  @ApiDeleteAllDevicesSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllDevices(@Cookies() cookies): Promise<void> {
    return this.command.execute(
      new DeleteAlldevicesCommand(cookies.refreshToken),
    );
  }

  @Delete('devices/:deviceId')
  @ApiDeleteDeviceByIdSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDevicesByDeviceId(
    @Cookies() cookies,
    @Param('deviceId') deviceId: string,
  ) {
    return this.command.execute(
      new DeleteAllDevicesByDeviceIdCommand(cookies.refreshToken, deviceId),
    );
  }
}
