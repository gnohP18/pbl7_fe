import { predictAPI } from "~/api/model";
import type { Job, JobResult } from "~/entities/job";
import type { PredictResponse } from "~/entities/message";

interface State {
    isLoading: Boolean,
    isSucceed: Boolean,
    responsePredict: PredictResponse
}

const defaultState: State = {
    isLoading: false,
    isSucceed: false,
    responsePredict: {
        keywords: '',
        products: {}
    }
}

export const predictStore = defineStore('predictStore', {
    state: (): State => Object.assign(defaultState),
    actions: {
        async predictSentenceStore(text: string) {
            this.$state.isLoading = true;
            this.$state.isSucceed = false;
            await predictAPI(text).then((result) => {
                this.$state.responsePredict = result[0];
                this.$state.isLoading = false;
                this.$state.isSucceed = true;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.$state.isLoading = false;
            })
        },
    }
});