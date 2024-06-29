import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cars")
export class carEntity {
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
}
