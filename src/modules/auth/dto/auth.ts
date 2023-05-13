import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const lengthConstants = {
  login: {
    minLength: 3,
    maxLength: 10,
  },
  password: {
    minLength: 6,
    maxLength: 20,
  },
};

export class AuthDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    description: 'User login',
    example: 'John',
    type: 'string',
    minLength: lengthConstants.login.minLength,
    maxLength: lengthConstants.login.maxLength,
  })
  @Length(lengthConstants.login.minLength, lengthConstants.login.maxLength)
  login: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    description: 'User password',
    example: 'string',
    type: 'string',
    minLength: lengthConstants.password.minLength,
    maxLength: lengthConstants.password.maxLength,
  })
  @Length(
    lengthConstants.password.minLength,
    lengthConstants.password.maxLength,
  )
  password: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  email: string;
}

export class NewPasswordDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(
    lengthConstants.password.minLength,
    lengthConstants.password.maxLength,
  )
  @ApiProperty({
    description: 'newPassword',
    example: 'qwerty',
    type: 'string',
    format: 'newPassword',
    minLength: lengthConstants.password.minLength,
    maxLength: lengthConstants.password.maxLength,
  })
  newPassword: string;
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @ApiProperty({
    description: 'recoveryCode',
    example: '123.4567',
    type: 'string',
    format: 'recoveryCode',
  })
  recoveryCode: string;
}

export class ConfirmationCodeDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'Confirmation code',
    example: 'someUUIDdsajkdsa-dsad-as-das-ddsa',
    type: 'string',
    format: 'email',
  })
  code: string;
}

export class EmailDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@gmail.com',
    type: 'string',
    format: 'email',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;
}
