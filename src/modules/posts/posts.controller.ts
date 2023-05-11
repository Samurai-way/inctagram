import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Posts } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserModel } from '../../../swagger/Users/user.model';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { User } from '../auth/decorators/request';
import { PostsRepository } from './repository/posts';
import { CreatePostCommand } from './use-cases/create-post';
import { DeletePostByIdCommand } from './use-cases/delete-post';
import { UpdatePostByIdCommand } from './use-cases/update-post';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(public command: CommandBus, public postsRepo: PostsRepository) {}

  @Get(':postId')
  // @ApiFindPostByIdSwagger()
  async findPostById(@Param('postId') postId: string): Promise<Posts> {
    return this.postsRepo.findPostById(postId);
  }

  @Post('')
  // @ApiCreatePostSwagger()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile() photo: Express.Multer.File,
    @User() user: UserModel,
    @Body() dto: CreatePostDto,
  ): Promise<Posts> {
    return this.command.execute(
      new CreatePostCommand(user.id, photo, dto.description),
    );
  }

  @Delete(':postId')
  // @ApiDeletePostByIdSwagger()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(
    @User() user: UserModel,
    @Param('postId') postId: string,
  ): Promise<Posts> {
    return this.command.execute(new DeletePostByIdCommand(user.id, postId));
  }

  @Put(':postId')
  // @ApiUpdatePostSwagger()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updatePostById(
    @User() user: UserModel,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto,
  ): Promise<Posts> {
    return this.command.execute(
      new UpdatePostByIdCommand(postId, user.id, dto.description),
    );
  }
}
