// auth.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  async kakaoLogin(@Res() res: Response) {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.authService['REST_API_KEY']}&redirect_uri=${this.authService['REDIRECT_URI']}`;
    return res.redirect(kakaoAuthUrl);
  }

  @Get('kakao/callback')
  async kakaoCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      // 1. 카카오로부터 액세스 토큰 가져오기
      const tokenResponse = await this.authService.getKakaoToken(code);
      const accessToken = tokenResponse.data.access_token;

      // 2. 액세스 토큰을 사용해 사용자 정보 가져오기
      const userInfoResponse =
        await this.authService.getKakaoUserInfo(accessToken);
      const kakaoUser = userInfoResponse.data.kakao_account;

      // 3. 사용자 정보 데이터베이스에 저장 또는 기존 사용자 정보 가져오기
      const user = await this.authService.validateOrCreateUser({
        email: kakaoUser.email,
        username: kakaoUser.profile.nickname,
      });

      // 4. JWT 토큰 생성
      const jwt = await this.authService.login(user);

      // 5. 특정 경로로 리다이렉션하면서 JWT 토큰을 쿼리 파라미터로 전달
      const redirectUrl = `${this.authService.REDIRECTION_URL}?token=${jwt.access_token}`;
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      return res.status(500).json({ message: '카카오 로그인 실패' });
    }
  }

  @Get('validate')
  async validateUser(
    @Query('email') email: string,
    @Query('accessToken') accessToken: string,
  ) {
    try {
      const user = await this.authService.validateUserByEmail(
        email,
        accessToken,
      );
      return { message: 'User validated', user };
    } catch (error) {
      return { message: 'Validation failed', error: error.message };
    }
  }
}
