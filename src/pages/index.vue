<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { type MessageEntity } from "~/entities/message";
import Message from "~/components/chat/Message.vue";

definePageMeta({
  layout: "default",
});

const messDefault = [
  "Những sản phẩm chúng tôi khuyến nghị cho bạn là:",
  "Các sản phẩm chúng tôi tìm được chính là:",
  "Các sản phẩm dành cho bạn là:",
  "Tôi nghĩ các sản phẩm dưới đây là các sản phẩm bạn cần:",
  "Theo tôi các sản phẩm dưới đây có thể là:"
]

const store = predictStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const toast = useToast();
const arrMessgae = ref<MessageEntity[]>([
  { message: "Xin chào, mời bạn nhập câu mô tả điện thoại", is_server: true, predictResponse: { keywords: '', products: null }  }
]);
const responsePredict = computed(() => store.responsePredict);
const keyword = computed(() => store.responsePredict.keywords.split(','))

const message = ref<string>("");

const sendQuestion = async () => {
  scrollToBottom();
  const newMessage: MessageEntity = {
    message: message?.value,
    is_server: false,
    loading: false,
    predictResponse: {
      keywords: '',
      products: {}
    }
  };
  arrMessgae.value.push(newMessage);
  const waitingAnswerMessage: MessageEntity = {
    message: "Something went wrong",
    is_server: true,
    loading: true,
    predictResponse: {
      keywords: '',
      products: {}
    }
  };
  arrMessgae.value.push(waitingAnswerMessage);
  await store.predictSentenceStore(newMessage?.message ?? "");

  if (!isLoading.value && isSucceed.value) {
    const index =  Math.floor(Math.random() * messDefault.length);
    arrMessgae.value.pop();
      const succesAnswerMessage: MessageEntity = {
        message: messDefault[index],
        is_server: true,
        loading: false,
        predictResponse: {
          keywords: responsePredict.value.keywords,
          products: responsePredict.value.products
        }
      };
      arrMessgae.value.push(succesAnswerMessage);
  } else {

  }

  message.value = "";
};
const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

watch(arrMessgae, () => console.log(arrMessgae));
</script>

<template>
  <div class="h-[95vh] grow flex flex-col justify-between">
    <div class="container-message">
      <div class="overscroll-autol">
        <div v-for="mess in arrMessgae">
          <Message
            :content="mess.message"
            :is-server="mess.is_server"
            :loading="mess.loading"
            :product="mess.predictResponse.products"
            :keyword="mess.predictResponse.keywords"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full bg-slate-100 p-2 rounded-1 text-center items-center justify-center"
    >
      <form @submit.prevent="sendQuestion">
        <InputGroup>
          <InputText id="input_mess" class="w-full border-1 p-2" v-model="message" />
          <Button
            :loading="isLoading"
            icon="pi pi-telegram h-[25px] w-[25px] items-center justify-center pt-1"
            style="font-size: 1.5rem"
            @click="sendQuestion"
          />
        </InputGroup>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-message {
  padding: 10px 10px;
  max-height: 100%;
  overflow: scroll;
}
</style>
