import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommand } from '@nestjs/cqrs';
import { DevicesRepository } from '../repository/devices.repository';
import { AuthService } from '../../auth/service/auth';

@Injectable()
export class DeleteAlldevicesCommand {
  constructor(readonly refreshToken: string) {}
}

@CommandHandler(DeleteAlldevicesCommand)
export class DeleteAlldevicesUseCase implements ICommand {
  constructor(
    public authService: AuthService,
    public devicesRepo: DevicesRepository,
  ) {}

  async execute({ refreshToken }: DeleteAlldevicesCommand): Promise<void> {
    if (!refreshToken) throw new UnauthorizedException([]);
    const lastActive =
      this.authService.getLastActiveDateFromRefreshToken(refreshToken);
    if (!lastActive) throw new UnauthorizedException([]);
    const user = await this.authService.tokenVerify(refreshToken);
    if (!user) throw new UnauthorizedException([]);
    const { userId, deviceId } = user;
    return this.devicesRepo.deleteAllDevicesById(userId, deviceId);
  }
}
