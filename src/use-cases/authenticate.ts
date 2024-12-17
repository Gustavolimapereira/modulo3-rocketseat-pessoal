import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"

class InvalidCredentialsError extends Error {
    constructor() {
        super('Wrong username or password.')
        this.name = 'InvalidCredentialsError'
    }
}

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse{
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doestPasswordMatches = await compare(password, user.password_hash)

        if(!doestPasswordMatches){
            throw new InvalidCredentialsError
        }

        return {
            user,
        }
    }
}