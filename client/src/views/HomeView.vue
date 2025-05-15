<script setup>
  import PostDestaque from '@/components/PostDestaque.vue'
  import Menu from '@/components/Menu.vue'
</script>

<template>
    <Menu pagina_ativa="/"/>
    <main class="flex-1 p-10 overflow-y-auto h-full w-full">
      <h2 class="text-3xl font-bold">Bem-vindo à minha página!</h2>
      <p class="mt-4">Este é um exemplo de uma página com um menu lateral, um cabeçalho, um rodapé e uma lista de postagens usando Tailwind CSS 4.1.</p>
      

        <h3 class="text-2xl mt-6">Lista de Postagens</h3>
        <section class="mt-4 space-y-4">
          <PostDestaque 
            titulo="Concurso IFMS"
            conteudo="Alunos do IFMS"
            dataPublicacao="25/05/2025"
            url="/postagem/1"
          />
          <PostDestaque 
            titulo="Concurso IFMS"
            conteudo="Alunos do IFMS"
            dataPublicacao="25/05/2025"
            url="/postagem/2"
          />
          <PostDestaque 
            titulo="Concurso IFMS"
            conteudo="Alunos do IFMS"
            dataPublicacao="25/05/2025"
            url="/postagem/3"
          />
        </section>
    </main>
</template>
