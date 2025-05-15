<script setup>
    defineProps({
        pagina_ativa: {
            type: String,
            required: true
        }
    })
</script>

<template>
      <aside class="w-64 bg-gray-800 text-white flex-shrink-0 overflow-y-auto">
        <div class="p-4 text-lg font-bold">Meu Menu</div>
        <ul class="mt-6">
          <li :class="{
            'hover:bg-gray-700 p-2 bg-gray-700' :pagina_ativa === '/', 'hover:bg-gray-700 p-2': pagina_ativa !=='/'}">
            <a href="/">Início
            </a>
          </li>
          <li :class="{
            'hover:bg-gray-700 p-2 bg-gray-700' :pagina_ativa === '/sobre', 'hover:bg-gray-700 p-2': pagina_ativa !=='/sobre'}"
          >
            <a href="/sobre">Sobre</a>
          </li>
          <li class="hover:bg-gray-700 p-2"><a href="#">Serviços</a></li>
          <li class="hover:bg-gray-700 p-2"><a href="#">Contato</a></li>
        </ul>
      </aside>
</template>

<style scoped>

</style>