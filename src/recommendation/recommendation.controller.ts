// recommendation.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { Recommendation } from './recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  findAll(): Promise<Recommendation[]> {
    return this.recommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Recommendation> {
    return this.recommendationService.findOne(id);
  }

  @Post()
  create(
    @Body() createRecommendationDto: CreateRecommendationDto,
  ): Promise<Recommendation> {
    return this.recommendationService.create(createRecommendationDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecommendationDto: UpdateRecommendationDto,
  ): Promise<Recommendation> {
    return this.recommendationService.update(id, updateRecommendationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.recommendationService.delete(id);
  }
}
