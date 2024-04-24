<script setup>
import AppTopBar from '~/components/layouts/AppTopbar.vue';


</script>
<template>
  <div>
    <div class="flex flex-col w-screen h-screen justify-content-center">
      <Toast />
      <AppTopBar/>
      <div class="h-[100vh]">
        <slot/>
      </div>
    </div>
  </div>
</template>
