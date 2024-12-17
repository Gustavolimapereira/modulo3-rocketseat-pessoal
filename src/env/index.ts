import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
  console.error('❌ Variaveis de ambiente invalidas', _env.error.format())

  throw new Error('Variaveis de ambiente invalidas')
}

export const env = _env.data

/*
Este código:

    Carrega variáveis de ambiente do arquivo .env.
    Valida e aplica valores padrão usando o zod.
    Garante que todas as variáveis críticas estejam corretas antes de iniciar a aplicação.
    Exporta as variáveis validadas para uso no restante do código.
*/