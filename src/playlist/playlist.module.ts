// playlist.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Song } from '../song/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
