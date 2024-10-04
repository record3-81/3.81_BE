// song.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SpotifyService } from '../spotify/spotify.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly spotifyService: SpotifyService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(page: number = 1, limit: number = 50): Promise<Song[]> {
    const offset = (page - 1) * limit;
    return await this.songRepository.find({
      skip: offset,
      take: limit,
      order: { id: 'DESC' }, // 최근 곡 순서로
    });
  }
  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOne({ where: { id } });
  }

  async search(query: string): Promise<any> {
    const accessToken = this.configService.get<string>('SPOTIFY_ACCESS_TOKEN');
    const spotifyResponse = await this.spotifyService.searchSongs(
      query,
      accessToken,
    );
    return spotifyResponse.data.tracks.items; // 검색된 곡을 저장하지 않고 반환만
  }

  async delete(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
