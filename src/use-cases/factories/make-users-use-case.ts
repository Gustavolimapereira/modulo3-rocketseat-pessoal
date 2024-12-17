import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsersUseCase } from "../getall-users";


export function makeGetUsersUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const getUsersUseCase = new GetAllUsersUseCase(usersRepository)

    return getUsersUseCase
}