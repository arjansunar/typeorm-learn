// import { Dog } from 'src/dog/dog.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Dog } from 'src/dog/dog.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Dog, (dog) => dog.user)
  dogs: Dog[];

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
