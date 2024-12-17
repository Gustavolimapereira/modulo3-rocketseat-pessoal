import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../delete-users";



export function makeDeleteUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    return deleteUserUseCase
} 

