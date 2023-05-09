import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommand } from '@nestjs/cqrs';


@Injectable()
export class UploadFileCommand {
  constructor(
    // readonly userId: string, readonly photo: Express.Multer.File
  ) {}
}

@CommandHandler(UploadFileCommand)
export class UploadFileUseCase implements ICommand {
  constructor(
    // public s3Repo: S3FilesRepository,
    // public usersRepo: UsersRepository,
  ) {}

  // async execute({
  //                 userId,
  //                 photo,
  //               }: UploadFileCommand): Promise<{ photo: string }> {
  //   const savedPhoto = await this.s3Repo.saveFile(
  //     photo.buffer,
  //     photo.fieldname,
  //     photo.mimetype,
  //   );
  //   const { photo: savedPhotoUrl } =
  //     await this.usersRepo.updateUserAvatarByUserId(userId, savedPhoto.url);
  //   return { photo: savedPhotoUrl };
  // }
}
