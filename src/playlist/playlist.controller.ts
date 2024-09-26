// playlist.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  findAll(): Promise<Playlist[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Playlist> {
    return this.playlistService.findOne(id);
  }

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistService.create(createPlaylistDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.playlistService.delete(id);
  }
}
