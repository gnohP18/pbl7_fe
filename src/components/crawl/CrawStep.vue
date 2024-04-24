<script lang="ts" setup>
const toast = useToast();
const emits = defineEmits([
  'crawlCategory', 
  'crawlEndPageLink', 
  'crawlProduct', 
  'crawlDescription', 
  'crawlComment'
]);

const severityMap = {
  done: 'success',
  progress: 'info',
  pending: 'warning'
}

const loading = ref<boolean>(false)

const events = ref([
  { step: "Crawl category", status: 'done', total: 3, dir: "./Temp1", step_id: 1 },
  { step: "Crawl end page link", status: 'done', total: 3, dir: "./Temp2", step_id: 2 },
  { step: "crawl product", status: 'progress', total: 1132, dir: "./Temp3", step_id: 3 },
  { step: "crawl description", status: 'pending', total: 2600, dir: "./Temp4", step_id: 4 },
  { step: "crawl comment", status: 'pending', total: 4100, dir: "./Temp5", step_id: 5 },
]);

const startCrawlTGDD = (step_id: number) => {
  switch (step_id) {
    case 0:
      crawlCategory();
      crawlEndPageLink();
      crawlProduct();
      crawlDescription();
      crawlComment();
      loading.value = true;
      break;
    case 1:
      crawlCategory();
      break;
    case 2:
      crawlEndPageLink();
      break;
    case 3:
      crawlProduct();
      break;
    case 4:
      crawlDescription();
      break;
    case 5:
      crawlComment();
      break;
    default:
      break;
  }
};

const crawlCategory = () => {
  toast.add({
    severity: "info",
    summary: "Action",
    detail: "Start crawl category",
    life: 3000,
  });
  emits('crawlCategory');
};

const crawlEndPageLink = () => {
  toast.add({
    severity: "info",
    summary: "Action",
    detail: "Start crawl end Page link",
    life: 3000,
  });
};

const crawlProduct = () => {
  toast.add({
    severity: "info",
    summary: "Action",
    detail: "Start crawl Product",
    life: 3000,
  });
};

const crawlDescription = () => {
  toast.add({
    severity: "info",
    summary: "Action",
    detail: "Start crawl Description",
    life: 3000,
  });
};

const crawlComment = () => {
  toast.add({
    severity: "info",
    summary: "Action",
    detail: "Start crawl Comment",
    life: 3000,
  });
};
</script>
<template>
  <div class="flex flex-col h-full grow p-2">
    <div class="py-4">
      <Button
        label="Start crawl The gioi di dong"
        outlined
        class="border-2 px-2"
        @click="startCrawlTGDD(0)"
      />
    </div>
    <div
      class="outline-dashed outline-1 outline-offset-1 outline-slate-200 rounded py-2"
    >
      <Timeline :value="events" align="alternate">
        <template #content="slotProps">
          <div class="flex flex-row outline-dashed outline-1 outline-offset-1 outline-slate-200 p-2 justify-between">
            <div class="flex flex-col">
              <span class="m-1">{{ slotProps.item.step }}<Tag class="m-1" :severity="severityMap[slotProps.item.status]" :value="slotProps.item.status"></Tag></span>
              <span class="m-1">Total record crawled <Tag class="m-1" :severity="severityMap[slotProps.item.status]" :value="slotProps.item.total"></Tag></span>
              <ProgressBar v-show="slotProps.item.status === 'progress'" mode="indeterminate" style="height: 6px" class="my-2"></ProgressBar>
              <Button
                :loading="loading"
                label="Re-crawl"
                outlined
                class="border-2 px-2 w-[100px]"
                @click="startCrawlTGDD(slotProps.item.step_id)"
              />
            </div>
            <div>
              <Button icon="pi pi-download" severity="secondary" class="rounded-full outline-dashed outline-1 outline-offset-1 outline-slate-200"></Button>
            </div>
          </div>
        </template>
      </Timeline>
    </div>
  </div>
</template>
