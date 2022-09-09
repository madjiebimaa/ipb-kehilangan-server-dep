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

export enum PostLostStatus {
  LOST = "lost",
  FOUND = "found",
  RETURNED = "returned",
}

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    name: "lost_status",
    type: "enum",
    enum: PostLostStatus,
    default: PostLostStatus.LOST,
  })
  lostStatus: string;

  @Column({ name: "lost_date", nullable: true })
  lostDate: Date;

  @Column({ name: "lost_location", length: 200, nullable: true })
  lostLocation: string;

  @Column({ name: "view_count", default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Item)
  @JoinColumn({ name: "item_id" })
  item: Relation<Item>;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;

  @BeforeInsert()
  private setId() {
    const post = this as Post;
    post.id = `post_${nanoid()}`;
  }
}
