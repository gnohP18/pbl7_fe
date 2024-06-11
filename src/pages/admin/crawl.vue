<script lang="ts" setup>
import { crawlStore } from '~/stores/crawl';
import { get, debounce } from 'lodash-es';
import { TASK_CRAWL_KEY, TASK_CRAWL_KEY_LABEL , STATUS_LABEL, STATUS } from '~/constants/job';
import { CELERY_DASHBOARD_URL } from '~/constants/config';
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import { useToast } from "primevue/usetoast";
import type { Job, TotalCount } from '~/entities/job';

import Dropdown from 'primevue/dropdown';
useHead({ title: 'Crawl'});

const store = crawlStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = computed(() => store.$state.isLoading);
const isSucceed = computed(() => store.$state.isSucceed);
const jobs = computed(() => store.$state.jobs);
const jobsData = ref<[id: Job][]>([]);
const keyRender = ref<number>(0);
const lastSync = ref<string>();

onMounted(async() => {
  await store.indexCrawlStore();
  await store.getResultCrawl();
  prepareData();
  selectedUrlCrawl.value = urlCrawl[0];
  lastSync.value = new Date().toLocaleTimeString();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
})

const prepareData = () => {
  let data: [id: Job][] = []
  jobs.value.forEach((item) => {
    data[String(item?.job_type)] = item
  })
  
  jobsData.value = data;
}

const download = (name: string) => {
  window.location.href = generateUrlDownloadFile(name);
}

const goToTaskCelery = (jobId: string) => {
  window.location.href = CELERY_DASHBOARD_URL + '/task/'+ jobId;
}

const reCrawl = async (type: string) => {
  await store.crawlFollowTaskKeyStore(type);

  if (!isLoading.value && isSucceed.value) {
    toast.add({ severity: 'success', summary: 'ACTION SUCEEED', detail: `Task ${type} created`, life: 3000 });
    debouncedSyncPage();
  }
}
const syncPage = () => {
  window.location.reload();
}
const debouncedSyncPage = debounce(syncPage, 3000);

const selectedUrlCrawl = ref();
const urlCrawl = [
  {value: 'https://www.thegioididong.com/', label: "Thegioididong" }
]

const crawlAll = async () => {
  await store.crawlAllStore();

  if (!isLoading.value && isSucceed.value) {
    toast.add({ severity: 'success', summary: 'ACTION SUCEEED', detail: `Crawl all created`, life: 3000 });
    debouncedSyncPage();
  }
}

const chartData = ref();
const chartOptions = ref();
const category = computed(() => {
  return Object.keys(store.jobResultStatistic)
})

const numberWordCount = computed(() => {
  const listObj = Object.values(store.jobResultStatistic);
  let result: number = [];
  listObj.forEach((item: TotalCount)  => {
    result.push(Number(item.words_count));
  })
  return result;
})

const numberSentenceCount = computed(() => {
  const listObj = Object.values(store.jobResultStatistic);
  let result: number = [];
  listObj.forEach((item: TotalCount)  => {
    result.push(Number(item.sentence_count));
  })
  return result;
})
const setChartData = () => {
const documentStyle = getComputedStyle(document.documentElement);
  console.log(numberWordCount.value);
  
  return {
      labels: category.value,
      datasets: [
          {
              label: 'Number of words',
              backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
              borderColor: documentStyle.getPropertyValue('--cyan-500'),
              data: numberWordCount.value
          },
          {
              label: 'Number of sentences',
              backgroundColor: documentStyle.getPropertyValue('--gray-500'),
              borderColor: documentStyle.getPropertyValue('--gray-500'),
              data: numberSentenceCount.value
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
</script>
<template>
  <div class="pt-3 flex flex-col gap-y-3 px-4">
    <span class="font-bold text-3xl">Crawl</span>
    <div class="border rounded-md w-full grid grid-cols-2 gap-2">
      <div class="flex flex-col p-2">
        <label for="url-crawl" class="text-base font-bold">Select URL to crawl</label>
        <Dropdown v-model="selectedUrlCrawl" :options="urlCrawl" option-label="label" class="w-full border"/>
      </div>
      <div class="flex flex-row items-center justify-between p-3 pt-8"> 
        <Button class="h-[40px] p-2 gap-2 border hover:border-emerald-600" @click="crawlAll">
          Crawl all
        </Button>
        <Button class="h-[40px] p-2 gap-2 border hover:border-emerald-600" @click="syncPage">
          <span>Last sync {{ lastSync }}</span>
          <i class="pi pi-sync"></i>
        </Button>
      </div>
    </div>
  </div>
  <div class="pt-3 grid grid-cols-2 gap-y-3 px-4">
    <div class="flex flex-col">
      <label for="crawl-step" class="text-base font-bold p-2">Step crawl and status</label>
      <div v-for="job, index in Object.values(TASK_CRAWL_KEY)" class="step-crawl p-2 w-full flex flex-row gap-x-2" :key="keyRender">
        <div class="step-crawl-index border border-emerald-600 border-dashed w-[50px] flex items-center text-center text-2xl justify-center rounded-lg">
          <span>{{ index + 1}}</span>
        </div>
        <div class="flex flex-col border w-full p-2 rounded-lg gap-y-2">
          <div class="flex flex-row gap-x-2 items-center">
            <label for="crawl-category" class="text-sm font-bold">
              {{ TASK_CRAWL_KEY_LABEL[job] }}
            </label>
            <Tag value="Primary" class="text-sm" @click="goToTaskCelery(get(jobsData, `${job}.job_id`))">
              {{ get(jobsData, `${job}.job_id`) }}
              <i class="pi pi-link"></i>
            </Tag>
          </div>
          <div class="w-full">
            <div class="text-sm font-bold">{{ get(jobsData, `${job}.status`) }}</div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div class="flex flex-col">
              <label for="begin_at" class="text-sm">Begin at</label>
              <span>{{ new Date(get(jobsData, `${job}.begin_at`)).toLocaleString() }}</span>
            </div>
            <div class="flex flex-col">
              <label for="end_at" class="text-sm">End at</label>
              <span>{{ new Date(get(jobsData, `${job}.end_at`)).toLocaleString() }}</span>
            </div>
            <div class="flex flex-row gap-x-2">
              <Button 
                icon="pi pi-sync" 
                label="Re crawl"
                :loading="get(jobsData, `${job}.status`) === STATUS.IN_PROGRESS"
                :disabled="get(jobsData, `${job}.status`) === STATUS.IN_PROGRESS"
                class="bg-emerald-400 rounded-md outline-dashed outline-1 outline-offset-1 outline-slate-200 p-2 text-white"
                @click="reCrawl(get(jobsData, `${job}.job_type`))"
                />
              <Button 
                icon="pi pi-download" 
                label="Download"
                :loading="get(jobsData, `${job}.status`) === STATUS.IN_PROGRESS"
                class="bg-cyan-300 rounded-md outline-dashed outline-1 outline-offset-1 outline-slate-200 p-2"
                @click="download(get(jobsData, `${job}.job_type`))"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full">
      <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full"  />
    </div>
  </div>
</template>
<style scoped>
.p-stepper {
  flex-basis: 50rem;
}

.step-crawl {
  &:hover {
    .step-crawl-index {
      -webkit-transition: background-color 500ms linear;
      -ms-transition: background-color 500ms linear;
      transition: background-color 500ms linear;
      background-color: rgb(254 240 138 / var(--tw-border-opacity));
    }
  }
}
</style>
