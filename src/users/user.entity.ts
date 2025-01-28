import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  googleId?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
