// song.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongService } from './song.service';
import { SongController } from './song.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}
