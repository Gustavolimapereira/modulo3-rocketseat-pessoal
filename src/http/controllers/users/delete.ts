import { makeDeleteUseCase } from '@/use-cases/factories/make-delete-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function deleted(request: FastifyRequest, reply: FastifyReply){

    const deleteParamsSchema = z.object({
        id: z.string().uuid()
    })

    const {id} = deleteParamsSchema.parse(request.params)

    console.log("Usuário logado:", request.user);

    try{
        const deleteUseCase = makeDeleteUseCase()

        await deleteUseCase.execute({
            id
        })
    }catch(err){
        return reply.status(400).send({ message: 'Error deleting user' })
    }
    return reply.status(200).send({ message: 'User deleted successfully' })
}