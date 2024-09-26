// recommendation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from './recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepository: Repository<Recommendation>,
  ) {}

  async findAll(): Promise<Recommendation[]> {
    return await this.recommendationRepository.find({
      relations: ['user', 'playlist'],
    });
  }

  async findOne(id: number): Promise<Recommendation> {
    return await this.recommendationRepository.findOne({
      where: { id },
      relations: ['user', 'playlist'],
    });
  }

  async create(
    createRecommendationDto: CreateRecommendationDto,
  ): Promise<Recommendation> {
    const recommendation = this.recommendationRepository.create(
      createRecommendationDto,
    );
    return await this.recommendationRepository.save(recommendation);
  }

  async update(
    id: number,
    updateRecommendationDto: UpdateRecommendationDto,
  ): Promise<Recommendation> {
    await this.recommendationRepository.update(id, updateRecommendationDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.recommendationRepository.delete(id);
  }
}
