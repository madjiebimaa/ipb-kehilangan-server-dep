import { nanoid } from "nanoid";
import {
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  Relation,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("items")
export class Item extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => ItemImage, (imageUrl) => imageUrl.item, { cascade: true })
  imageUrls: Relation<ItemImage[]>;

  @OneToMany(
    () => ItemCharacteristic,
    (characteristic) => characteristic.item,
    { cascade: true }
  )
  characteristics: Relation<ItemCharacteristic[]>;

  @BeforeInsert()
  private setId() {
    const item = this as Item;
    item.id = `item_${nanoid()}`;
  }
}

@Entity("item_characteristics")
export class ItemCharacteristic extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  characteristic: string;

  @ManyToOne(() => Item, (item) => item.characteristics)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @BeforeInsert()
  private setId() {
    const ItemCharacteristic = this as ItemCharacteristic;
    ItemCharacteristic.id = `item_characteristic_${nanoid()}`;
  }
}

@Entity("item_images")
export class ItemImage extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Item, (item) => item.imageUrls)
  @JoinColumn({ name: "item_id" })
  item: Item;

  @BeforeInsert()
  private setId() {
    const itemImage = this as ItemImage;
    itemImage.id = `item_image_${nanoid()}`;
  }
}
