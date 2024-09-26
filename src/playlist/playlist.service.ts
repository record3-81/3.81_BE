// playlist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.find({ relations: ['songs', 'user'] });
  }

  async findOne(id: number): Promise<Playlist> {
    return await this.playlistRepository.findOne({
      where: { id },
      relations: ['songs', 'user'],
    });
  }

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = this.playlistRepository.create(createPlaylistDto);
    return await this.playlistRepository.save(playlist);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    await this.playlistRepository.update(id, updatePlaylistDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}
