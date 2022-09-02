import { User } from "./User";
import {
  Column,
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Post {
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
}
