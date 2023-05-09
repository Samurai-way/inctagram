import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommand } from '@nestjs/cqrs';
import { UserProfileDto } from "../dto/user-profile";
import { Profile } from "passport";
import { UsersRepository } from "../repository/users.repository";


@Injectable()
export class UpdateProfileCommand {
  constructor(readonly dto: UserProfileDto, readonly userId: string) {}
}

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileUseCase implements ICommand {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute({ userId, dto }: UpdateProfileCommand) {
    // const profile: Profile = await this.usersRepo.updateUsersProfileByUserId(
    //   userId,
    //   dto,
    // );
    // return {
    //   name: profile.name,
    //   city: profile.city,
    //   surname: profile.surname,
    //   aboutMe: profile.aboutMe,
    //   dateOfBirthday: profile.dateOfBirthday,
    // };
  }
}
