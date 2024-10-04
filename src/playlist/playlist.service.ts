import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from '../song/song.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findReceivedPlaylists(userId: number): Promise<Playlist[]> {
    return await this.playlistRepository.find({
      where: { sentTo: { id: userId } },
      relations: ['user', 'songs'],
    });
  }

  async findPlaylistDetails(id: number): Promise<any> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['user', 'songs'],
    });

    if (!playlist) {
      throw new Error('Playlist not found');
    }

    // 필요한 정보만 추출해서 반환
    return {
      title: playlist.name,
      sender: playlist.user.username, // 보낸 사람 이름
      message: playlist.message, // 메모
      songs: playlist.songs.map((song) => ({
        title: song.title,
        artist: song.artist,
        spotifyUrl: song.spotifyUrl, // 곡별 Spotify 링크
      })),
    };
  }

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const { songIds, ...rest } = createPlaylistDto;
    const playlist = this.playlistRepository.create(rest);

    if (songIds && songIds.length > 0) {
      const songs = await this.songRepository.findBy({
        id: In(songIds),
      });
      playlist.songs = songs;
    }

    if (createPlaylistDto.message) {
      playlist.message = createPlaylistDto.message;
    }

    return await this.playlistRepository.save(playlist);
  }
}
