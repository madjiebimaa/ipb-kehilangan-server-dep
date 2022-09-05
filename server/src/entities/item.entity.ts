import { nanoid } from "nanoid";
import {
  Column,
  Entity,
  PrimaryColumn,
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
  imageUrl: string;

  @Column()
  // !FIX: change type to []ItemCharacter when the model already exist
  characteristics: string;

  @BeforeInsert()
  setId() {
    const item = this as Item;
    item.id = `item_${nanoid()}`;
  }
}
