// update-playlist.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiProperty({ description: 'The unique identifier of the playlist' })
  id: number;
}
