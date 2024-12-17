import { makeGetUsersUseCase } from "@/use-cases/factories/make-users-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

class UserNotFound extends Error {
    constructor() {
        super('User not found.')
        this.name = 'UserNotFound'
    }
}

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  
    try{
        const getUsersUseCase = makeGetUsersUseCase()

        const {user} = await getUsersUseCase.execute({})

        return reply.status(201).send({user})
    }catch(err) {
        if (err instanceof UserNotFound){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }

    

}