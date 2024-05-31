<script lang="ts" setup>
const dir = "/Mixed";
let list;
const getListDir = (from: number, to: number) => {
  let listDir = [];
  for (let i = from; i <= to; i++) {
    listDir.push(`${dir}/image_${i}.jpg`);
  }

  return listDir;
};
const step = 20;
</script>
<template>
  <div class="mx-auto grid grid-cols-5 gap-x-2">
    <div v-for="col in [0,1,2,3,4]" class="flex flex-col gap-y-3">
        <img 
            v-for="dir in getListDir(col * step + 1 , col * step + step)" 
            :src="dir" 
            :key="dir" 
            class="rounded-md hover:border-red-500 hover:bottom-1"/>
    </div>
  </div>
</template>
