// recommendation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Playlist } from '../playlist/playlist.entity';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.recommendations)
  user: User;

  @ManyToOne(() => Playlist, (playlist) => playlist)
  playlist: Playlist;
}
