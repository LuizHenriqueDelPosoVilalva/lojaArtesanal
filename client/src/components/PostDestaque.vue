<script setup>
  defineProps({
    titulo: String,
    conteudo: String,
    dataPublicacao:String
  })
</script>

<template>
    <article class="bg-white shadow-md rounded-lg p-4 w-full">
          <h4 class="text-xl font-semibold">{{titulo}}</h4>
          <p class="text-gray-600">{{conteudo}}</p>
          <p class="text-gray-500 text-sm mt-2">Publicado em: {{dataPublicacao}}</p>
        </article>
</template>

<style scoped>

</style>