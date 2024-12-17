import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"


class InvalidIdError extends Error {
    constructor() {
        super('Id não encontrado')
        this.name = 'InvalidIdError'
    }
}

interface UpdateUserUseCaseRequest {
    id: string,
    name?: string,
    email?: string,
    password?: string
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        id, name, email, password
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse>{

        if (!id || typeof id !== "number" && typeof id !== "string") {
            throw new InvalidIdError();
          }

        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new InvalidIdError()
        }

        const dataToUpdate: Partial<User> = {}
        if(name) dataToUpdate.name = name
        if(email) dataToUpdate.email = email
        if(password) dataToUpdate.password_hash = await hash(password, 6)

        if (Object.keys(dataToUpdate).length === 0) {
            throw new Error('Nenhuma informação fornecida para atualização.');
        }
 
        const updatedUser = await this.usersRepository.update(id, dataToUpdate)

        return {
            user
        }
    }
}