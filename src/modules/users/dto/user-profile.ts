import { IsDate, IsOptional, IsString, Length, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const lengthConstants = {
  name: {
    minLength: 1,
    maxLength: 30,
  },
  aboutMe: {
    minLength: 1,
    maxLength: 200,
  },
};

export class UserProfileDto {
  @ApiProperty({
    description: 'Users name',
    example: 'string',
    type: 'string',
    required: false,
  })
  @Length(lengthConstants.name.minLength, lengthConstants.name.maxLength)
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty({
    description: 'User surname',
    example: 'string',
    type: 'string',
    required: false,
  })
  @Length(lengthConstants.name.minLength, lengthConstants.name.maxLength)
  @IsString()
  @IsOptional()
  surname: string;
  @ApiProperty({
    description: 'User date of birthday',
    example: 'some date',
    type: 'string',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date())
  @IsOptional()
  dateOfBirthday: Date;
  @ApiProperty({
    description: 'User city',
    example: 'string',
    type: 'string',
    required: false,
  })
  @Length(lengthConstants.name.minLength, lengthConstants.name.maxLength)
  @IsString()
  @IsOptional()
  city: string;
  @ApiProperty({
    description: 'Information about user',
    example: 'string',
    type: 'string',
    required: false,
  })
  @Length(lengthConstants.aboutMe.minLength, lengthConstants.aboutMe.maxLength)
  @IsString()
  @IsOptional()
  aboutMe: string;
}
