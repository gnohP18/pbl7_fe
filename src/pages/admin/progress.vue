<script lang="ts" setup>
import { crawlStore } from '#imports';

import Button from 'primevue/button';
import Timeline from 'primevue/timeline';
import { useToast } from "primevue/usetoast";
import CrawlStep from '~/components/crawl/CrawStep.vue';


const store = crawlStore();
const toast = useToast();

const loading = computed(() => store.$state.loading);

const events = ref([
  { step: 'Crawl category', total: 3, dir: './Temp1', step_id: 1 },
  { step: 'Crawl end page link', total: 3, dir: './Temp2', step_id: 2 },
  { step: 'crawl product', total: 1132, dir: './Temp3', step_id: 3 },
  { step: 'crawl description', total: 2600, dir: './Temp4', step_id: 4 },
  { step: 'crawl comment', total: 4100, dir: './Temp5', step_id: 5 },
])

</script>
<template>
  <Stepper>
    <StepperPanel header="Crawl Data">
      <template #content="{ nextCallback }">
        <CrawlStep />
        <div class="flex pt-4 justify-end">
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="nextCallback"
          />
        </div>
      </template>
    </StepperPanel>
    
    <StepperPanel header="Preprocess">
      <template #content="{ prevCallback, nextCallback }">
        <div class="flex flex-col h-[12rem]">
          <div
            class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
          >
            Content II
          </div>
        </div>
        <div class="flex pt-4 justify-content-between">
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="prevCallback"
          />
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="nextCallback"
          />
        </div>
      </template>
    </StepperPanel>
    <StepperPanel header="Pre-train">
      <template #content="{ prevCallback }">
        <div class="flex flex-col h-[12rem]">
          <div
            class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium"
          >
            Content III
          </div>
        </div>
        <div class="flex pt-4 justify-content-start">
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            @click="prevCallback"
          />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
</template>
<style scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>
