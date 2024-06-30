import { UserEntity } from "./user.model";
import { CarAdEntity } from "./car.ad.model";
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
  @OneToMany(() => CarAdEntity, (car_Ad) => car_Ad.city)
  car_ad: CarAdEntity[];
}
