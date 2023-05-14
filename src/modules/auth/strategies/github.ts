import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ISocialUser } from 'src/modules/users/types/types';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUBURL,
      scope: ['user'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void,
  ) {
    const user: ISocialUser = {
      email: profile.emails[0].value,
      login: profile.username,
    };
    done(null, user);
  }
}
