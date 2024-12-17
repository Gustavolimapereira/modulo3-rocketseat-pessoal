import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { deleted } from "./delete";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { updated } from "./update";
import { getAllUsers } from "./users";


export async function usersRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/session', authenticate)

    app.delete('/users/:id', { onRequest: verifyJwt }, deleted)
    app.patch('/users/:id', { onRequest: verifyJwt }, updated)
    app.get('/users', { onRequest: verifyJwt }, getAllUsers)

}