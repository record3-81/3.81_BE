// song.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOne({ where: { id } });
  }

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songRepository.create(createSongDto);
    return await this.songRepository.save(song);
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    await this.songRepository.update(id, updateSongDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
