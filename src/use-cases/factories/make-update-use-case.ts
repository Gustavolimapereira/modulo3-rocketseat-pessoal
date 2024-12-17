import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserUseCase } from "../update-user";


export function makeUpdateUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const updatedUseCase = new UpdateUserUseCase(usersRepository)

    return updatedUseCase
}