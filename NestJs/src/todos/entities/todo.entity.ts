import { User } from 'src/user/entities/user.entity';
import { Base } from 'src/user/utils/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Todo extends Base {
  @Column()
  title: string;

  @Column({ default: 'false' })
  complete: boolean;

  @ManyToOne(() => User, (user) => user.todo)
  user: User;
}
