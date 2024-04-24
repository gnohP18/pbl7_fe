<script lang="ts" setup>
import Fieldset from "primevue/fieldset";


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
  }
});
</script>
<template>
  <Card class="border-2 m-2 shadow-none transition-opacity duration-500 ease-in-out opacity-100">
		<template #content class="m-0">
			<div :class="{ 'text-end justify-end': !props.isServer}" class="flex items-center">
				<Avatar v-show="props.isServer" image="/robot.jpeg" class="mr-2" shape="circle" />
				<Avatar v-show="!props.isServer" image="/cat.jpeg" class="mr-2" shape="circle" />
				<span class="text-sm">{{ props.isServer ? 'Server' : 'You' }}</span>
			</div>
			<div class="py-2" :class="{ 'text-end': !props.isServer}">
				<span v-show="!props.loading">{{ props.content }}</span>
				<ProgressSpinner v-show="props.loading"  style="width: 20px; height: 20px" strokeWidth="8" fill="var(--surface-ground)"
    				animationDuration=".5s" aria-label="Custom ProgressSpinner" />
			</div>
		</template>
	</Card>
</template>
<style scoped>
:deep(.p-card-body){
	padding: 12px !important;
}
</style>
