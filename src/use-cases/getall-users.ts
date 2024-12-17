import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

class InvalidIdError extends Error {
    constructor() {
        super('Id não encontrado.')
        this.name = 'InvalidIdError'
    }
}

interface GetAllUsersUseCaseRespose {
    user: User[] | null
}

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository){}


    async execute({

    }): Promise<GetAllUsersUseCaseRespose>{


        const users = await this.usersRepository.findAll()

        if(!users){
            throw new InvalidIdError()
        }

        return {
            user: users
        }
    }

}