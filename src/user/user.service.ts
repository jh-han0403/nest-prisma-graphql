import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUser(id: number) {
    const user = await this.userRepository.getUser({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async createUser(createUserInput: CreateUserInput) {
    return await this.userRepository.createUser(createUserInput);
  }

  public async updateUser(id: number, updateUserInput: UpdateUserInput) {
    return await this.userRepository.updateUser({ id }, updateUserInput);
  }

  public async deleteUser(id: number) {
    return await this.userRepository.deleteUser({ id });
  }
}
