import { env } from "@/env";
import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

/*
Este código cria uma instância configurada do Prisma Client que 
será usada ao longo do projeto para realizar operações no banco 
de dados. Ele habilita logs de consultas apenas em modo de desenvolvimento, 
o que é útil para depuração, mas evita logs desnecessários em produção, 
garantindo melhor desempenho e segurança.
*/