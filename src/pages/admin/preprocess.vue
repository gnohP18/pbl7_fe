<script lang="ts" setup>
useHead({ title: 'Preprocess'});

const lastSync = ref<string>();

onMounted(() => {
  lastSync.value = new Date().toLocaleTimeString();
})

const syncPage = () => {
  window.location.reload();
}
</script>
<template>
<div class="pt-3 flex flex-col gap-y-3 px-4">
    <span class="font-bold text-3xl">Preprocess</span>
    <div class="border rounded-md w-full grid grid-cols-2 gap-2">
      <div class="flex flex-row items-center justify-end p-3"> 
        <Button class="h-[40px] p-2 gap-2 border hover:border-emerald-600" @click="syncPage">
          <span>Last sync {{ lastSync }}</span>
          <i class="pi pi-sync"></i>
        </Button>
      </div>
    </div>
</div>
</template>