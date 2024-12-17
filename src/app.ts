import fastify from "fastify";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { usersRoutes } from "./http/controllers/users/routes";


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '1d',
    },
})

app.register(fastifyCookie)

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError){
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production'){
        console.log(error)
    } else {

    } 

    return reply.status(500).send({message: 'Internal server error.'})
})

/*
Esse código configura:

    Um servidor Fastify com suporte a autenticação JWT e cookies.
    Registro de rotas personalizadas para usuários.
    Tratamento de erros:
        Validações específicas (usando zod).
        Exibição de erros no console (em desenvolvimento).
        Respostas genéricas para erros inesperados.

Ele segue boas práticas ao lidar com segurança (como JWT e cookies), 
além de fornecer feedback claro para erros, facilitando o desenvolvimento
 e a manutenção.
*/