import { nanoid } from "nanoid";
import { Post } from "./post.entity";
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  BeforeInsert,
  BaseEntity,
} from "typeorm";

@Entity("items")
export class Item extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  image: string;

  @Column()
  characteristics: string;

  @OneToOne(() => Post, (post) => post.item)
  post: Post;

  @BeforeInsert()
  setId() {
    const item = this as Item;
    item.id = nanoid();
  }
}
