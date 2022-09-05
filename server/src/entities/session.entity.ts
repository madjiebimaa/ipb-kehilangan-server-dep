import { User } from "./user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  JoinColumn,
} from "typeorm";
import { nanoid } from "nanoid";

@Entity("sessions")
export class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ default: true })
  valid: boolean;

  @Column({ name: "user_agent" })
  userAgent: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: Relation<User>;

  @BeforeInsert()
  setId() {
    const session = this as Session;
    session.id = `session_${nanoid()}`;
  }
}
