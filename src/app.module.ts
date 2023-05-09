import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './modules/auth/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegistrationUseCase } from './modules/auth/use-cases/registration';
import { ConfirmationUseCase } from './modules/auth/use-cases/confirmation';
import { EmailResendingUseCase } from './modules/auth/use-cases/emailResending';
import { RefreshTokenUseCase } from './modules/auth/use-cases/refreshToken';
import { PasswordRecoveryUseCase } from './modules/auth/use-cases/passwordRecovery';
import { NewPasswordUseCase } from './modules/auth/use-cases/newPassword';
import { LogoutUseCase } from './modules/auth/use-cases/logout';
import { LoginUseCase } from './modules/auth/use-cases/login';
import { UpdateProfileUseCase } from './modules/users/use-cases/updateProfile';
import { UploadFileUseCase } from './modules/users/use-cases/uploadFile';
import { FindProfileUseCase } from './modules/users/use-cases/findProfile';
import { EmailRepository } from './modules/email/email.repository';
import { EmailService } from './modules/email/email.service';
import { DevicesController } from './modules/devices/devices.controller';
import { GetAlldevicesUseCase } from './modules/devices/use-cases/getAlldevices';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DevicesRepository } from './modules/devices/repository/devices.repository';
import { DeleteAlldevicesUseCase } from './modules/devices/use-cases/deleteAlldevices';
import { AuthService } from './modules/auth/service/auth';
import { DeleteAllDevicesByDeviceIdUseCase } from './modules/devices/use-cases/deleteAllDevicesByDeviceId';
import { UsersRepository } from './modules/users/repository/users.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './modules/users/service/users.service';
import { JWT } from './modules/auth/constants';
import { LocalStrategy } from './modules/auth/strategies/local';
import { JwtStrategy } from './modules/auth/strategies/jwt';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth';
import { LocalAuthGuard } from './modules/auth/guards/local-auth';

const controllers = [AppController, AuthController, DevicesController];
const services = [
  AppService,
  PrismaService,
  EmailService,
  JwtService,
  AuthService,
  UsersService,
];
const repositories = [EmailRepository, DevicesRepository, UsersRepository];
const useCases = [
  RegistrationUseCase,
  ConfirmationUseCase,
  EmailResendingUseCase,
  RefreshTokenUseCase,
  PasswordRecoveryUseCase,
  NewPasswordUseCase,
  LogoutUseCase,
  LoginUseCase,
  UpdateProfileUseCase,
  UploadFileUseCase,
  FindProfileUseCase,
  GetAlldevicesUseCase,
  DeleteAlldevicesUseCase,
  DeleteAllDevicesByDeviceIdUseCase,
];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    JwtModule.register({
      secret: JWT.jwt_secret,
      signOptions: { expiresIn: '600s' },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'user2023newTestPerson@gmail.com',
          pass: 'chucmvqgtpkxstks',
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
  ],
  controllers,
  providers: [
    ...useCases,
    ...services,
    ...repositories,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
  ],
})
export class AppModule {}
