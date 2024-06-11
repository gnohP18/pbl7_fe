<script lang="ts" setup>
import TerminalService from 'primevue/terminalservice';
import { executeCLI } from '~/api/message';

const emit = defineEmits(["topbarMenuToggle", "menuToggle"]);
const visible = ref(false);
onMounted(() => {
  TerminalService.on("command", commandHandler);
});

onBeforeUnmount(() => {
  TerminalService.off("command", commandHandler);
});

const commandHandler = (text: string) => {
  // let response;
  // let argsIndex = text.indexOf("");
  // let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

  executeCLI(text).then((res) => {
    TerminalService.emit("response", res);
  });
  
};

const returnTo = (to: string) => {
  navigateTo(`/admin/${to}`);
}
</script>

<template>
  <div class="h-[5vh]">
    <div>
      <Button
        class="p-link layout-menu-button layout-topbar-button p-2"
        @click="visible = true"
      >
        <i class="pi pi-arrow-right" />
      </Button>
    </div>
  </div>
  <Sidebar v-model:visible="visible" header="PBL7">
    <div class="flex flex-col card w-full gap-y-2">
      <div class="card w-full border rounded-lg p-2 menu-item" @click="() => navigateTo('/')">
        <Button icon="pi pi-comment" label="Predict"/>
      </div>
      <!-- <div class="card w-full border rounded-lg p-2 menu-item" @click="returnTo('')">
        <Button icon="pi pi-home" label="Home"/>
      </div> -->
      <div class="card w-full border rounded-lg p-2 menu-item" @click="returnTo('crawl')">
        <Button icon="pi pi-cloud-download" label="Crawl"/>
      </div>
      <div class="card w-full border rounded-lg p-2 menu-item" @click="returnTo('preprocess')">
        <Button icon="pi pi-database" label="Preprocess"/>
      </div>
      <!-- <div class="card w-full border rounded-lg p-2 menu-item" @click="returnTo('setting')">
        <Button icon="pi pi-cog" label="Setting"/>
      </div> -->
    </div>
  </Sidebar>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11B9B5;
    border-width: 2px;
  }
}
</style>
