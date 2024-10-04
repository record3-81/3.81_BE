// spotify.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SpotifyService {
  private readonly SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

  constructor(private readonly httpService: HttpService) {}

  async searchSongs(query: string, accessToken: string): Promise<any> {
    const url = `${this.SPOTIFY_BASE_URL}/search?q=${query}&type=track&limit=10`;
    const response = this.httpService.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return lastValueFrom(response);
  }
}
