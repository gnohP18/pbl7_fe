<script lang="ts" setup>
import { get, debounce } from 'lodash-es';
import Timeline from 'primevue/timeline';
import type { JobResult } from "~/entities/job";
import Chart from 'primevue/chart';
import { STATUS, TASK_PREPROCESS_KEY_LABEL } from '~/constants/job';
import { CELERY_DASHBOARD_URL } from '~/constants/config';

useHead({ title: 'Preprocess'});
const store = preprocessStore();
const lastSync = ref<string>();
const jobResult = computed(() => store.jobResult);
const job = computed(() => store.job);
onMounted(async () => {
  await store.indexPreprocessStore();
  prepareData();
  lastSync.value = new Date().toLocaleTimeString();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
})

const syncPage = () => {
  window.location.reload();
}
const dataForChart =  ref();
const prepareData  = () => {
  let data: [key: string][] = []
  jobResult.value.forEach(item => {
    data[TASK_PREPROCESS_KEY_LABEL[get(item, 'job_type', '')]] = item.total_record;
  })
  dataForChart.value = data;  
}

const chartData = ref();
const chartOptions = ref();
const setChartData = () => {
const documentStyle = getComputedStyle(document.documentElement);
  return {
      labels: Object.keys(dataForChart.value),
      datasets: [
          {
              label: 'Number of record',
              backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
              borderColor: documentStyle.getPropertyValue('--cyan-500'),
              data: Object.values(dataForChart.value)
          }
      ]
  };
}
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
const download = (name: string) => {
  window.location.href = generateUrlDownloadFile(name);
}
const toast = useToast();
const isLoading = computed(() => store.$state.isLoading);
const isSucceed = computed(() => store.$state.isSucceed);
const startPreprocess = async () => {
  await store.startPreprocessStore();

  if (!isLoading.value && isSucceed.value) {
    toast.add({ severity: 'success', summary: 'ACTION SUCEEED', detail: `Preprocess task created`, life: 3000 });
    debouncedSyncPage();
  }
}

const goToTaskCelery = (jobId: string) => {
  window.location.href = CELERY_DASHBOARD_URL + '/task/'+ jobId;
}

const debouncedSyncPage = debounce(syncPage, 3000);
</script>
<template>
  <div class="pt-3 flex flex-col gap-y-3 px-4 h-full flex-1">
      <span class="font-bold text-3xl">Preprocess</span>
      <div class="border rounded-md w-full grid grid-cols-2 gap-2">
        <div class="p-3 flex flex-row  gap-x-2">
          <Button class="h-[40px] p-2 gap-2 border hover:border-emerald-600" 
            :loading="String(job.status) === STATUS.IN_PROGRESS"
            icon="pi pi-sync"
            label="Start preprocess"
            @click="startPreprocess"/>
          <Button 
            icon="pi pi-download" 
            :loading="String(job.status) === STATUS.IN_PROGRESS"
            label="Download preprocessed data"
            class="bg-cyan-300 rounded-md outline-1 outline-offset-1 outline-slate-200 p-2"
            @click="download('preprocess')"
            />
          <Button 
            icon="pi pi-link" 
            label="Celery"
            class="p-2 "
            @click="goToTaskCelery(get(job, 'job_id', ''))"
            />
        </div>
        <div class="flex flex-row items-center justify-end p-3"> 
          <Button class="h-[40px] p-2 gap-2 border hover:border-emerald-600" @click="syncPage">
            <span>Last sync {{ lastSync }}</span>
            <i class="pi pi-sync"></i>
          </Button>
          {{ get(job, '', '') }}
        </div>
      </div>
      <div class="grid grid-cols-2 h-full">
        <Timeline :value="jobResult" class="timeline-preprocess">
          <template #content="slotProps">
            <div class="hover:rounded-md hover:border hover:border-dashed hover:border-emerald-600 p-2 flex flex-col gap-y-2">
              <span class="text-base font-bold">{{ TASK_PREPROCESS_KEY_LABEL[get(slotProps, 'item.job_type', '')] }}</span>
              <div class="grid grid-cols-2 gap-x-2">
                <label for="data">Total record <i class="pi pi-database"></i></label>
                <span>{{ get(slotProps, 'item.total_record', '') }}</span>
                <label for="data">Begin at</label>
                <span>{{ new Date(get(slotProps, 'item.begin_at', '')).toLocaleString() }}</span>
                <label for="data">End at</label>
                <span>{{ new Date(get(slotProps, 'item.end_at', '')).toLocaleString() }}</span>
              </div>
            </div>
          </template>
        </Timeline>
        <div class="w-full h-full">
          <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full"  />
        </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.timeline-preprocess :deep(.p-timeline-event-opposite) {
  display: none;
}
</style>