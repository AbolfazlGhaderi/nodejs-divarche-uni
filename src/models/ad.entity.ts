import { CityEntity } from "./city.entity";
import { UserEntity } from "./user.entity";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(EntityNameEnum.Ad)
export class AdEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  p_year: string;
  @Column({ nullable: false })
  color: string;
  @Column({ nullable: false })
  price: string;
  @Column({ nullable: false, default: true }) // true : healthy  false : Un-Healthy
  engine_check: boolean;
  @Column({ nullable: false, default: true }) // true : healthy  false : Un-Healthy
  gearbox_check: boolean;
  @CreateDateColumn()
  create_atr: Date;
  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.ad, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.ad, { nullable: false })
  @JoinColumn({ name: "city_id" })
  city: string;
}
