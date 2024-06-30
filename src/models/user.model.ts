import { CityEntity } from "./city.model";
import { CarAdEntity } from "./car.ad.model";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity(EntityNameEnum.User)
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false, unique: true })
  phone: string;
  @Column({ nullable: true })
  address: string;
  @OneToMany(() => CarAdEntity, (car_ad) => car_ad.user)
  car_ads: CarAdEntity[];

  @ManyToOne(() => CityEntity, (city) => city.user, { nullable: false })
  @JoinColumn({ name: "city_id" })
  city: CityEntity;
}
