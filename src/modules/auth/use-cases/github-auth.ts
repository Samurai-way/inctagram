import { Injectable } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../users/repository/users.repository';
import { DevicesRepository } from '../../devices/repository/devices.repository';
import { AuthDto } from '../dto/auth';
import { AuthService } from '../service/auth';
import { RegistrationCommand } from './registration';

@Injectable()
export class GithubAuthCommand {
  constructor(readonly dto: AuthDto, readonly info) {}
}

@CommandHandler(GithubAuthCommand)
export class GithubAuthUseCase implements ICommandHandler {
  constructor(
    public usersRepo: UsersRepository,
    private commandBus: CommandBus,
    public authService: AuthService,
    public devicesRepo: DevicesRepository,
  ) {}

  async execute({ dto, info }: GithubAuthCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.usersRepo.findUserByEmail(dto.email);
    if (!user) {
      const newUser = await this.commandBus.execute(
        new RegistrationCommand(dto),
      );
      const jwt = await this.authService.createJwtPair(
        newUser.id,
        info.deviceId,
      );
      const lastActiveDate =
        await this.authService.getLastActiveDateFromRefreshToken(
          jwt.refreshToken,
        );
      await this.devicesRepo.createUserSession(
        info.ip,
        info.title,
        lastActiveDate,
        info.deviceId,
        newUser.id,
      );
      return jwt;
    } else {
      const jwt = await this.authService.createJwtPair(user.id, info.deviceId);

      const lastActiveDate =
        await this.authService.getLastActiveDateFromRefreshToken(
          jwt.refreshToken,
        );
      await this.devicesRepo.createUserSession(
        info.ip,
        info.title,
        lastActiveDate,
        info.deviceId,
        user.id,
      );
      return jwt;
    }
  }
}
