import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('received/:userId')
  findReceivedPlaylists(@Param('userId') userId: number): Promise<any> {
    return this.playlistService.findReceivedPlaylists(userId);
  }

  @Get('details/:id')
  findPlaylistDetails(@Param('id') id: number): Promise<any> {
    return this.playlistService.findPlaylistDetails(id);
  }

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<any> {
    return this.playlistService.create(createPlaylistDto);
  }
}
