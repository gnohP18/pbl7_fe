<script setup>
import { ref } from "vue";
import TerminalService from "primevue/terminalservice";
const visible = ref(false);
onMounted(() => {
    TerminalService.on('command', commandHandler);
})

onBeforeUnmount(() => {
    TerminalService.off('command', commandHandler);
})

const commandHandler = (text) => {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch(command) {
        case "date":
            response = 'Today is ' + new Date().toDateString();
            break;

        case "greet":
            response = 'Hola ' + text.substring(argsIndex + 1);
            break;

        case "random":
            response = Math.floor(Math.random() * 100);
            break;

        default:
            response = "Unknown command: " + command;
    }
    
    TerminalService.emit('response', response);
}
</script>
<template>
  <div>
    <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible" header="Sidebar">
        <div class="card bg-slate-400">
            <Terminal
            class="bg-slate-400"
                welcomeMessage="Type your command"
                prompt="PBL7$"
                aria-label="CLI service"
            />
        </div>
      </Sidebar>
      <Button icon="pi pi-arrow-right" @click="visible = true" />
    </div>
    <slot />
  </div>
</template>
