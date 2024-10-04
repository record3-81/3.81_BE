// create-playlist.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'The name of the playlist' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The ID of the user who owns the playlist' })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'List of song IDs to be included in the playlist',
    isArray: true,
  })
  @IsArray()
  songIds: number[];

  @ApiProperty({
    description: 'A message or memo for the playlist',
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
