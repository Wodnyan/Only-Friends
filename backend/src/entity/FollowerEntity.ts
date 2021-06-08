import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./UserEntity";

@Unique(["follower", "following"])
@Entity()
export class Follower {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
}
