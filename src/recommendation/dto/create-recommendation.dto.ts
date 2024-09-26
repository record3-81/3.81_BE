// create-recommendation.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateRecommendationDto {
  @ApiProperty({ description: 'The message of the recommendation' })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'The ID of the user who made the recommendation',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'The ID of the playlist being recommended' })
  @IsNumber()
  playlistId: number;
}
