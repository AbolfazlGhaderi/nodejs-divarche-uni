import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.model";

@Entity(EntityNameEnum.City)
export class CityEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  name: string;
  @OneToMany(() => UserEntity, (user) => user.city)
  user: UserEntity[];
}
