import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.getUser(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.updateUser(
      updateUserInput.id,
      updateUserInput,
    );
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.deleteUser(id);
  }
}
