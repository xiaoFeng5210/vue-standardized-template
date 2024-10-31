<script setup lang="ts">
function handlerShowToast() {
  showToast('你好')
}
</script>

<template>
  <h1 class="text-3xl font-bold underline" @click="handlerShowToast">
    Hello world!
  </h1>
</template>

<style scoped lang="scss">
</style>
