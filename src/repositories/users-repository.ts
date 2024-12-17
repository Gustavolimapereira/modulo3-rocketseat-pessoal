import {Prisma, User} from '@prisma/client'

export interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    delete(id: string): Promise<null>
    update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>
    findAll(): Promise<User[]>
}