import { User } from "./user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  BeforeInsert,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { nanoid } from "nanoid";

@Entity("sessions")
export class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: true })
  valid: boolean;

  @Column()
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @BeforeInsert()
  setId() {
    const session = this as Session;
    session.id = nanoid();
  }
}
