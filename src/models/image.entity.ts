import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityNameEnum } from '../common/enums/entity.name.enum';
import { AdEntity } from './ad.entity';
import { UserEntity } from './user.entity';

@Entity(EntityNameEnum.Image)
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: false })
  location: string;
  @Column({ nullable: false, enum: ['ad', 'profile'] })
  section: string;

  @ManyToOne(() => UserEntity, (user) => user.image, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => AdEntity, (ad) => ad.image)
  ad: AdEntity;

  @CreateDateColumn()
  create_at: Date;
  
}
