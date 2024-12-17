import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";


export class PrismaUsersRepository implements UsersRepository{

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id,
            }
        })
        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })
        return user
    }

    async delete(id: string){
        await prisma.user.delete({
            where:{
                id
            }
        })
        return null
    }

    async update(id: string, data: Partial<Omit<User, 'id'>>){
        const updatedUser = await prisma.user.update({
            where: {id}, data,
        })
        return updatedUser
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users
    }
}