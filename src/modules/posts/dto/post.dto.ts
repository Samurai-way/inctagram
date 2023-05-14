import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const lengthConstants = {
  description: {
    minLength: 1,
    maxLength: 500,
  },
};

export class CreatePostDto {
  @ApiProperty({
    description: 'Description',
    example: 'Post description',
    type: 'String',
    minLength: lengthConstants.description.minLength,
    maxLength: lengthConstants.description.maxLength,
  })
  @Length(
    lengthConstants.description.minLength,
    lengthConstants.description.maxLength,
  )
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Photo',
    example: 'Multipart form data',
    format: 'Binary',
  })
  postPhoto: Express.Multer.File;
}

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post description',
    example: 'Hello world',
    format: 'String',
    minLength: lengthConstants.description.minLength,
    maxLength: lengthConstants.description.maxLength,
  })
  @Length(
    lengthConstants.description.minLength,
    lengthConstants.description.maxLength,
  )
  @IsString()
  description: string;
}
