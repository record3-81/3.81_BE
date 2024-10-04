// song.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Playlist } from '../playlist/playlist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  album: string;

  @Column()
  genre: string;

  @Column()
  spotifyUrl: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.songs)
  playlists: Playlist[];
}
