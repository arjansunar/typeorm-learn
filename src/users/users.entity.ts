import { DogEntity } from 'src/dog/dog.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  fullName: string;

  @Column('date')
  birthday: Date;

  @Column()
  isActive: boolean;

  @OneToMany(() => DogEntity, (dog) => dog.user)
  dogs: DogEntity[];
}
