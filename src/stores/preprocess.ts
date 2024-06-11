import { getDataCrawlAPI } from "~/api/file";
import { startPreprocessAPI, trackingAPI } from "~/api/job";
import { TASK_PREPROCESS_KEY, TASK_PREPROCESS_KEY_LABEL } from "~/constants/job";
import type { Job, JobResult } from "~/entities/job";

interface State {
    isLoading: Boolean,
    isSucceed: Boolean,
    job: Job,
    jobResult: JobResult[]
}

const defaultState: State = {
    isLoading: false,
    isSucceed: false,
    jobResult: [],
    job: {}
}

export const preprocessStore = defineStore('preprocessStore', {
    state: (): State => Object.assign(defaultState),
    actions: {
        async indexPreprocessStore() {
            this.$state.isLoading = true;
            await trackingAPI().then((result) => {
                this.$state.job = result.jobs.filter((item: Job) => item.job_type === 'preprocess')[0];
                console.log(this.$state.job);
                
                const arrKey = Object.values(TASK_PREPROCESS_KEY);
                this.$state.jobResult = [];
                result.job_results.forEach((item: JobResult) => {
                    arrKey.forEach(key => { 
                        if (key === item.job_type) {
                            this.$state.jobResult.push(item);
                    }})
                })
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.$state.isLoading = false;
            })
        },

        async startPreprocessStore() {
            this.$state.isLoading = true;
            this.$state.isSucceed = false;
            await startPreprocessAPI().then(() => {
                this.$state.isSucceed = true;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.$state.isLoading = false
            })
        }
    }
});