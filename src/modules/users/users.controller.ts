import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { JwtAuthGuard } from "../auth/guards/jwt-auth";
import { User } from "../auth/decorators/request";
import { UserModel } from "../../../swagger/Users/user.model";
import { UserProfileDto } from "./dto/user-profile";
import { UserProfileModel } from "./types/types";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateProfileCommand } from "./use-cases/updateProfile";
import { UploadFileCommand } from "./use-cases/uploadFile";
import { FindProfileCommand } from "./use-cases/findProfile";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(public readonly commandBus: CommandBus) {
  }

  @Put('profile')
  // @ApiUpdateProfileSwagger()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @User() user: UserModel,
    @Body() dto: UserProfileDto,
  ): Promise<UserProfileModel> {
    return this.commandBus.execute(new UpdateProfileCommand(dto, user.id));
  }

  @Post('avatar')
  // @ApiCreateAvatarSwagger()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  // async uploadImageForProfile(
  //   // @UploadedFile() photo: Express.Multer.File,
  //   @User() user: UserModel,
  // ): Promise<{ photo: string }> {
  //   // return this.commandBus.execute(new UploadFileCommand(user.id, photo));
  // }

  @Get('profile')
  // @ApiFindProfileSwagger()
  @UseGuards(JwtAuthGuard)
  async findProfileByUserId(
    @User() user: UserModel,
  ): Promise<UserProfileModel> {
    return this.commandBus.execute(new FindProfileCommand(user.id));
  }
}