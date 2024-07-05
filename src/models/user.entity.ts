import { AdEntity } from "./ad.entity";
import { CityEntity } from "./city.entity";
import { SessionEntity } from "./session.entity";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ImageEntity } from "./image.entity";

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
  @OneToMany(() => AdEntity, (ad) => ad.user)
  ad: AdEntity[];

  @ManyToOne(() => CityEntity, (city) => city.user, { nullable: true , eager:true})
  @JoinColumn({ name: "city_id" })
  city: CityEntity;

  @OneToMany(() => SessionEntity, (session) => session.user)
  session: SessionEntity[];
  
  @OneToMany(() => ImageEntity, (image) => image.user)
  image:ImageEntity[]
  
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
