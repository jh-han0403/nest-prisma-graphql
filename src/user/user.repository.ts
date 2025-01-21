import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.txHost.tx.user.create({ data });
  }

  public async getUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.txHost.tx.user.findUnique({
      where: { deletedAt: null, ...where },
    });
  }

  public async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.txHost.tx.user.update({
      where,
      data: { ...data, updatedAt: new Date() },
    });
  }

  public async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.txHost.tx.user.update({
      where,
      data: { deletedAt: new Date() },
    });
  }
}
