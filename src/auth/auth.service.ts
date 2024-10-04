// auth.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // 수정된 부분
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // 수정된 부분

@Injectable()
export class AuthService {
  private readonly REST_API_KEY: string;
  private readonly REDIRECT_URI: string;
  public readonly REDIRECTION_URL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.REST_API_KEY = this.configService.get<string>('KAKAO_REST_API_KEY');
    this.REDIRECT_URI = this.configService.get<string>('KAKAO_REDIRECT_URI');
    this.REDIRECTION_URL = this.configService.get<string>('REDIRECTION_URL');
  }

  async getKakaoToken(code: string): Promise<AxiosResponse<any>> {
    const tokenResponse = this.httpService.post(
      'https://kauth.kakao.com/oauth/token',
      null,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'authorization_code',
          client_id: this.REST_API_KEY,
          redirect_uri: this.REDIRECT_URI,
          code: code,
        },
      },
    );

    return lastValueFrom(tokenResponse);
  }

  async getKakaoUserInfo(token: string): Promise<AxiosResponse<any>> {
    const userResponse = this.httpService.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return lastValueFrom(userResponse);
  }

  async validateOrCreateUser(kakaoUser): Promise<any> {
    // 카카오에서 받아온 사용자 정보를 바탕으로 사용자를 찾거나 생성
    const existingUser = await this.userService.findOneByEmail(kakaoUser.email);

    if (existingUser) {
      return existingUser;
    }

    // 사용자가 없다면 새 사용자 생성
    const newUser = await this.userService.create({
      username: kakaoUser.nickname,
      email: kakaoUser.email,
      password: '', // 소셜 로그인 사용자는 비밀번호가 필요 없음
    });

    return newUser;
  }

  async validateUserByEmail(email: string, accessToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.userService.findOneByEmail(email);

      if (user && user.email === decoded.email) {
        return user;
      } else {
        throw new Error('Invalid user or token');
      }
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
