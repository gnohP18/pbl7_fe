<script lang="ts" setup>
import { type FileData } from "~/entities/file";
import { crawlStore } from "#imports";
import Button from "primevue/button";

const store = crawlStore();
const { getAllFileCrawl, downloadFileStore } = store;

onMounted(async() => {
  await getAllFileCrawl();
})

const download = (name: string) => {
  window.location.href = generateUrlDownloadFile(name);
}

// const select
</script>

<template>
  <!-- <div class="w-full h-full flex flex-row gap-2">
    <div class="w-4/12 px-2 gap-2">
      <Fieldset
        legend="Data crawl"
        class="card h-3/6 border-2 rounded-md p-1 overflow-scroll"
      >
        <div v-for="file in store.fileData">
          <div
            class="w-full outline outline-offset-1 outline-1 outline-slate-100 rounded-md mb-2 p-1 hover:bg-sky-50 justify-between flex flex-row"
          >
            <p>{{ file.name }}</p>
            <div class="flex flex-row gap-2">
              <span>{{ file.size }}</span>
              <Button 
                icon="pi pi-download" 
                severity="secondary" 
                class="rounded-full outline-dashed outline-1 outline-offset-1 outline-slate-200"
                @click="download(String(file.name))"
                />
            </div>
          </div>
        </div>
      </Fieldset>
      <div class="card h-3/6 border-2 rounded-md"></div>
    </div>
    <div class="w-8/12 primary-outline-pbl rounded-md">
    </div>
  </div> -->
  <div class="w-full ">
    <div></div>
    <div></div>
  </div>
</template>
<style scoped>
.primary-outline-pbl {
  border: 1px solid rgb(197, 226, 255);
  box-shadow: 0 0 0 1px rgba(168, 168, 168, 0.5);
  border-radius: 5px;
}
</style>
