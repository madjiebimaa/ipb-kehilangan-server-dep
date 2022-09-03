import { User } from "./user.entity";
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { Item } from "./item.entity";
import { nanoid } from "nanoid";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 20 })
  lostStatus: string;

  @Column({ nullable: true })
  lostDate: Date;

  @Column({ length: 200, nullable: true })
  lostLocation: string;

  @Column()
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Item, (item) => item.post, {
    cascade: true,
  })
  @JoinColumn()
  item: Item;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @BeforeInsert()
  setId() {
    const post = this as Post;
    post.id = nanoid();
  }
}
