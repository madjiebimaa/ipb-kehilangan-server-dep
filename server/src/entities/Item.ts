import { Post } from "./Post";
import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Item {
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
}
