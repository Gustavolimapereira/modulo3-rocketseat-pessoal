import { makeUpdateUseCase } from "@/use-cases/factories/make-update-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


class UserNotFound extends Error {
    constructor() {
        super('User not found.')
        this.name = 'UserNotFound'
    }
}

export async function updated(request: FastifyRequest, reply: FastifyReply){

    const paramsSchema = z.object({
        id: z.string(),
    });

    const updatedBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional()
    })

    const { id } = paramsSchema.parse(request.params)
    const {name, email, password} = updatedBodySchema.parse(request.body)

    try{
        const updatedUseCase = makeUpdateUseCase()

        await updatedUseCase.execute({
            id, name, email, password
        })
    }catch(err) {
        if (err instanceof UserNotFound){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }

    return reply.status(201).send()
}