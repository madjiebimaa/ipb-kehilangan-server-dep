import { Session } from "./session.entity";
import config from "config";
import { nanoid } from "nanoid";
import { Post } from "./post.entity";
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export class User extends BaseEntity {
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

  @Column({ length: 20, nullable: true })
  // !FIX: temporary nullable, change after role class already exist
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Relation<Post[]>;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Relation<Session[]>;

  private tempPassword: string;
  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  setId() {
    const user = this as User;
    user.id = `user_${nanoid()}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword() {
    const user = this as User;

    if (this.tempPassword !== this.password) {
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
      const hash = await bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
  }

  comparePassword(candidatePassword: string) {
    const user = this as User;

    return bcrypt.compare(candidatePassword, user.password).catch(() => false);
  }
}
