<script setup>
    defineProps({
        titulo: String
    })
</script>

<template>
    <h1><slot>{{ titulo }}</slot></h1>
</template>

<style scoped>
    
</style>