import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})


/*
npm install vite vitest vite-tsconfig-paths supertest --save-dev

O que o código faz?

O arquivo define uma configuração do Vitest com o Vite, habilitando:

    vite-tsconfig-paths:
        Esse plugin carrega automaticamente os paths definidos no arquivo tsconfig.json do 
        TypeScript.
        Isso facilita o uso de aliases de caminho, como @/services ou @/controllers, sem 
        precisar digitar caminhos relativos como ../../../.

    test.environmentMatchGlobs:
        Configura os ambientes de teste para arquivos específicos com base em globs 
        (padrões de caminho).
        Aqui, qualquer arquivo que esteja dentro de src/http/controllers/** será 
        executado com o ambiente prisma.
*/