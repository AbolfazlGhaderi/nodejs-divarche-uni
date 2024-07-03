import { UserEntity } from "./user.entity";
import { AdEntity } from "./ad.entity";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity(EntityNameEnum.City)
export class CityEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  name: string;
  @OneToMany(() => UserEntity, (user) => user.city)
  user: UserEntity[];
  @OneToMany(() => AdEntity, (ad) => ad.city)
  ad: AdEntity[];
}
