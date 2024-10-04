// song.controller.ts
import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Song[]> {
    return this.songService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Song> {
    return this.songService.findOne(id);
  }

  @Get('search')
  searchAndSave(@Query('query') query: string): Promise<Song[]> {
    return this.songService.search(query);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.songService.delete(id);
  }
}
