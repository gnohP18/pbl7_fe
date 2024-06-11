import { getDataCrawlAPI } from "~/api/file";
import { crawlAPI, trackingAPI } from "~/api/job";
import type { FileData } from "~/entities/file";
import type { Job } from "~/entities/job";

interface State {
    isLoading: Boolean,
    fileData: FileData[],
    isSucceed: Boolean,
    jobs: Job[]
}

const defaultState: State = {
    isLoading: false,
    isSucceed: false,
    jobs: [],
    fileData: []
}

export const crawlStore = defineStore('crawlStore', {
    state: (): State => Object.assign(defaultState),
    actions: {
        async getAllFileCrawl() {
            await getDataCrawlAPI().then((result) => {
                this.$state.fileData = result;
            })
        },
        
        async indexCrawlStore() {
            this.$state.isLoading = true;
            await trackingAPI().then((result) => {
                this.$state.jobs = result.jobs;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.$state.isLoading = false;
            })
        },

        async crawlFollowTaskKeyStore(taskKey: string) {
            this.$state.isLoading = true;
            this.$state.isSucceed = false;

            await crawlAPI(taskKey).then(() => {
                this.$state.isLoading = false;
                this.$state.isSucceed = true;
            })
            .catch(err => {
                this.$state.isSucceed = false;
                console.log(err);
            })
            .finally(() => {
                this.$state.isLoading = false;
            })
        }
    }
});
