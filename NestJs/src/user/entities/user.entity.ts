import { Todo } from 'src/todos/entities/todo.entity';
import { Base } from 'src/user/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todo: Todo[];
}
