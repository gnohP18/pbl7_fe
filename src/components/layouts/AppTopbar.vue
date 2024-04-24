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
  <Sidebar v-model:visible="visible" header="Simple Terminal" position="full">
    <div class="card h-1/2">
      <Terminal
        class="border-2"
        welcomeMessage="Type your command"
        prompt="PBL7$"
        aria-label="CLI service"
      />
    </div>
  </Sidebar>
</template>
