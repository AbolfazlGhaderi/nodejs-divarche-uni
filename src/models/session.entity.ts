
import { UserEntity } from "./user.entity";
import { EntityNameEnum } from "../common/enums/entity.name.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity(EntityNameEnum.Session)
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: false, unique: true,length: 300 })
  value: string;
  @Column({ nullable: false })
  expire_at: string;
  @Column({ nullable: false, default: true })
  is_valid: boolean;
  @ManyToOne(() => UserEntity, (user) => user.session, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
