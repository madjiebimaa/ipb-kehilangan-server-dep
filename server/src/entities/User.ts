import { Post } from "./Post";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 14, unique: true, nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  cardIdentity: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ length: 20 })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
