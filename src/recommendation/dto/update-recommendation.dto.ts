// update-recommendation.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecommendationDto } from './create-recommendation.dto';

export class UpdateRecommendationDto extends PartialType(
  CreateRecommendationDto,
) {
  @ApiProperty({ description: 'The unique identifier of the recommendation' })
  id: number;
}
