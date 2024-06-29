import { CarAdEntity } from "./car.ad.model";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityNameEnum.User)
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false, unique: true })
  phone: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @Column({ nullable: true })
  address: string;
  @OneToMany(() => CarAdEntity, (car_ad) => car_ad.user)
  car_ads: CarAdEntity[];
}
