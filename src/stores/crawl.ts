import { getDataCrawlAPI } from "~/api/file";
import type { FileData } from "~/entities/file";

interface State {
    loading: Boolean,
    fileData: FileData[]
}

const defaultState: State = {
    loading: false,
    fileData: []
}

export const crawlStore = defineStore('crawlStore', {
    state: (): State => Object.assign(defaultState),
    actions: {
        async getAllFileCrawl() {
            await getDataCrawlAPI().then((result) => {
                this.$state.fileData = result;
                console.log(this.$state.fileData);
            })
        }
    }
});
