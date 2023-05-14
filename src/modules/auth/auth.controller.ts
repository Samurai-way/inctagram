import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import {
  AuthDto,
  ConfirmationCodeDto,
  EmailDto,
  NewPasswordDto,
} from './dto/auth';
import { RegistrationCommand } from './use-cases/registration';
import { EmailConfirmation } from '@prisma/client';
import { ConfirmationCommand } from './use-cases/confirmation';
import { EmailResendingCommand } from './use-cases/emailResending';
import { LocalAuthGuard } from './guards/local-auth';
import { User } from './decorators/request';
import { Cookies } from './decorators/cookies';
import { Ip } from './decorators/ip';
import { IpDto } from './dto/api';
import { RefreshTokenCommand } from './use-cases/refreshToken';
import { PasswordRecoveryCommand } from './use-cases/passwordRecovery';
import { NewPasswordCommand } from './use-cases/newPassword';
import { LogoutCommand } from './use-cases/logout';
import { JwtAuthGuard } from './guards/jwt-auth';
import { UserModel } from '../../../swagger/Users/user.model';
import { LoginCommand } from './use-cases/login';
import { ApiRegistrationSwagger } from '../../../swagger/Auth/api-registration';
import { ApiRegistrationConfirmationSwagger } from '../../../swagger/Auth/api-registration-confirmation';
import { ApiRegistrationEmailResendingSwagger } from '../../../swagger/Auth/api-registration-email-resending';
import { ApiLoginSwagger } from '../../../swagger/Auth/api-login';
import { ApiRefreshTokenSwagger } from '../../../swagger/Auth/api-refresh-token';
import { ApiPasswordRecoverySwagger } from '../../../swagger/Auth/api-password-recovery';
import { ApiNewPasswordSwagger } from '../../../swagger/Auth/api-new-password';
import { ApiLogoutSwagger } from '../../../swagger/Auth/api-logout';
import { ApiMeSwagger } from '../../../swagger/Auth/api-me';
import { RecaptchaGuard } from './guards/recaptcha.guard';
import { GoogleOAuthGuard } from './guards/google-oauth';
import { AuthDecorator } from './decorators/google';
import { DeviceInfoDecorator } from './decorators/device-info';
import { GoogleAuthCommand } from './use-cases/google-auth';
import { ApiGoogleSwagger } from 'swagger/Auth/api-google';
import { GithubOauthGuard } from './guards/github-oauth';
import { ApiGithubSwagger } from '../../../swagger/Auth/api-github';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('registration')
  @ApiRegistrationSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(
    @Body() dto: AuthDto,
  ): Promise<{ result: boolean; data: { key: string } }> {
    return this.commandBus.execute(new RegistrationCommand(dto));
  }

  @Get('github')
  @ApiGithubSwagger()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('github-redirect')
  @ApiExcludeEndpoint()
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(
    @AuthDecorator() dto: AuthDto,
    @DeviceInfoDecorator() info,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new GoogleAuthCommand(dto, info),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
    });
    return { accessToken: accessToken };
  }

  @Get('google')
  @ApiGoogleSwagger()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @ApiExcludeEndpoint()
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @AuthDecorator() dto: AuthDto,
    @DeviceInfoDecorator() info,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new GoogleAuthCommand(dto, info),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
    });
    return { accessToken: accessToken };
  }

  @Post('registration-confirmation')
  @ApiRegistrationConfirmationSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationConfirmation(
    @Body() dto: ConfirmationCodeDto,
  ): Promise<EmailConfirmation> {
    return this.commandBus.execute(new ConfirmationCommand(dto));
  }

  @Post('registration-email-resending')
  @ApiRegistrationEmailResendingSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationEmailResending(@Body() dto: EmailDto): Promise<boolean> {
    return this.commandBus.execute(new EmailResendingCommand(dto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiLoginSwagger()
  async userLogin(
    @User() user: UserModel,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const ip = req.ip;
    const title = req.headers['user-agent'] || 'browser not found';
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new LoginCommand(ip, title, user),
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
    });
    return { accessToken: accessToken };
  }

  @Post('refresh-token')
  @ApiRefreshTokenSwagger()
  @HttpCode(HttpStatus.OK)
  async userRefreshToken(
    @Cookies() cookies,
    @Ip() ip: IpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const updateToken = await this.commandBus.execute(
      new RefreshTokenCommand(ip, cookies.refreshToken),
    );
    res.cookie('refreshToken', updateToken.refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
    });
    return updateToken;
  }

  @Post('password-recovery')
  @UseGuards(RecaptchaGuard)
  @ApiPasswordRecoverySwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async userPasswordRecovery(@Body() dto: EmailDto): Promise<boolean> {
    return this.commandBus.execute(new PasswordRecoveryCommand(dto));
  }

  @Post('new-password')
  @ApiNewPasswordSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async userNewPassword(@Body() dto: NewPasswordDto) {
    return this.commandBus.execute(new NewPasswordCommand(dto));
  }

  @Post('logout')
  @ApiLogoutSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  async userLogout(@Cookies() cookies): Promise<boolean> {
    return this.commandBus.execute(new LogoutCommand(cookies.refreshToken));
  }

  @Get('me')
  @ApiMeSwagger()
  @UseGuards(JwtAuthGuard)
  async getUser(
    @User() user: UserModel,
  ): Promise<{ email: string; login: string; userId: string }> {
    return { email: user.email, login: user.login, userId: user.id };
  }
}
