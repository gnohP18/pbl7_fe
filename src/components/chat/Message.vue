<script lang="ts" setup>
import Fieldset from "primevue/fieldset";
import type { Product } from "~/entities/message";


const props = defineProps({
  content: {
    type: String,
    default: "...",
  },
  isServer: {
    type: Boolean,
    default: false,
  },
  loading: {
	type: Boolean,
	default: false
  },
  keyword: {
	type: String,
	default: []
  },
  product: {
	type: Object as PropType<Product>,
	default: {}
  }
});
</script>
<template>
  <Card class="border-2 m-2 shadow-none transition-opacity duration-500 ease-in-out opacity-100 hover:border-dashed hover:border-black">
		<template #content class="m-0">
			<div :class="{ 'text-end justify-end': !props.isServer}" class="flex items-center">
				<Avatar v-if="props.isServer" image="/robot.jpeg" class="mr-2" shape="circle" />
				<Avatar v-if="!props.isServer" image="/cat.jpeg" class="mr-2" shape="circle" />
				<span class="text-sm">{{ props.isServer ? 'Server' : 'You' }}</span>
			</div>
			<div class="w-full">
				<ProgressSpinner class="py-2" v-if="props.loading"  style="width: 20px; height: 20px" strokeWidth="8" fill="var(--surface-ground)"
					animationDuration=".5s" aria-label="Custom ProgressSpinner" />
			</div>
			<div class="py-2 flex flex-col" :class="{ 'text-end': !props.isServer, ' w-[50%]': props.isServer}">
				<div class="flex flex-row items-center gap-x-2">
					<span v-if="props.isServer && !props.loading && props.keyword">Từ khoá</span>
					<div v-if="props.isServer  && !props.loading && props.keyword" class="flex flex-row gap-x-1 justify-start">
						<span 
							v-for="keyword in props.keyword.split(',')"
							class="bg-slate-300 p-1 rounded-md text-white hover:text-black" 
						>
							{{ keyword }}
						</span>
					</div>
				</div>
				<span v-if="!props.loading">{{ props.content }}</span>
				<div v-if="props.product && props.isServer && !props.loading" class="flex flex-col gap-y-2 w-50">
					<a :href="props.product.top1" class="text-base text-bg-red-200 border rounded-md p-2 w-auto hover:text-blue-300 hover:border-blue-300">
						{{props.product.top1}}
						<label class="p-1">{{ props.product.top1_score }}</label>
					</a>
					<a :href="props.product.top2" class="text-base text-bg-red-200 border rounded-md p-2 w-auto hover:text-blue-300 hover:border-blue-300">
						{{props.product.top2}}
						<label class="p-1">{{props.product.top2_score}}</label>
					</a>
					<a :href="props.product.top3" class="text-base text-bg-red-200 border rounded-md p-2 w-auto hover:text-blue-300 hover:border-blue-300">
						{{props.product.top3}}
						<label class="p-1">{{props.product.top3_score}}</label>
					</a>
				</div>
			</div>
			
		</template>
	</Card>
</template>
<style scoped>
:deep(.p-card-body){
	padding: 12px !important;
}
</style>
