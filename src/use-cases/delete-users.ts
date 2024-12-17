import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

class InvalidIdError extends Error {
    constructor() {
        super('Id não encontrado.')
        this.name = 'InvalidIdError'
    }
}

interface DeleteUserUseCaseRequest {
    id: string
}

interface DeleteUserUseCaseResponse{
    user: User | null
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        id
    }:DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse>{

        if (!id || typeof id !== "number" && typeof id !== "string") {
            throw new InvalidIdError();
          }

          const user = await this.usersRepository.findById(id);

        if(!user){
            throw new InvalidIdError()
        }

        const deleteUser = await this.usersRepository.delete(id)

            return { user: deleteUser };
    }
}