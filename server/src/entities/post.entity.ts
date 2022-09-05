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
  Relation,
} from "typeorm";
import { Item } from "./item.entity";
import { nanoid } from "nanoid";

enum PostStatus {
  LOST = "LOST",
  FOUND = "FOUND",
}

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 20, default: PostStatus.LOST })
  lostStatus: string;

  @Column({ nullable: true })
  lostDate: Date;

  @Column({ length: 200, nullable: true })
  lostLocation: string;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Item)
  @JoinColumn()
  item: Relation<Item>;

  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @BeforeInsert()
  setId() {
    const post = this as Post;
    post.id = `post_${nanoid()}`;
  }
}
