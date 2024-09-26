// update-song.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSongDto } from './create-song.dto';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @ApiProperty({ description: 'The unique identifier of the song' })
  id: number;
}
