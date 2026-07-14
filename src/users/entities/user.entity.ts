import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany(() => Service, (service) => service.user)
  services?: Service[];
}