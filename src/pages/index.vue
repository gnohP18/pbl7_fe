<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { type MessageEntity } from "~/entities/message";
import Message from "~/components/chat/Message.vue";
import { sendQuestionApi } from "~/api/message";
definePageMeta({
  layout: "default",
});
const arrMessgae = ref<MessageEntity[]>([
  {
    message: "Tôi muốn 1 chiếc điện thoại có thể chơi game mượt",
    is_server: false,
    loading: false,
  },
  {
    message: "Chúng tôi gợi ý cho bạn chiếc điện thoại Samsung Galaxy not 7",
    is_server: true,
    loading: false,
  },
  {
    message: "Chiếc điện thoại phải có thời lượng pin tốt",
    is_server: false,
    loading: false,
  },
  {
    message:
      "Điện thoại Iphone 15 promax có thời lượng pin lên đến 3600 mah phù hợp cho những người có nhu cầu sử dụng điện thoại như là công cụ chính",
    is_server: true,
    loading: false,
  },
  {
    message: "Tôi muốn 1 chiếc điện thoại có thể chơi game mượt",
    is_server: true,
    loading: false,
  },
  {
    message: "Tôi muốn 1 chiếc điện thoại có thể chơi game mượt",
    is_server: true,
    loading: false,
  },
  {
    message: "Tôi muốn 1 chiếc điện thoại có thể chơi game mượt",
    is_server: true,
    loading: false,
  },
  {
    message: "Tôi muốn 1 chiếc điện thoại có thể chơi game mượt",
    is_server: true,
    loading: false,
  },
]);

const message = ref<string>("");
const loading = ref<boolean>(false);

const sendQuestion = async () => {
  loading.value = true;
  console.log(arrMessgae.value);

  const newMessage: MessageEntity = {
    message: message?.value,
    is_server: false,
    loading: false,
  };
  arrMessgae.value.push(newMessage);
  const waitingAnswerMessage: MessageEntity = {
    message: "Something went wrong",
    is_server: true,
    loading: true,
  };
  arrMessgae.value.push(waitingAnswerMessage);
  await sendQuestionApi(newMessage?.message ?? "").then((result) => {
    setTimeout(() => {
      arrMessgae.value.pop();
      const succesAnswerMessage: MessageEntity = {
        message: "Success",
        is_server: true,
        loading: false,
      };
      arrMessgae.value.push(succesAnswerMessage);
      loading.value = false;
    }, 2000);
  });

  message.value = "";
};

watch(arrMessgae, () => console.log(arrMessgae));
</script>

<template>
  <div class="max-h-[95vh] grow flex flex-col">
    <div class="container-message">
      <div class="overscroll-autol">
        <div v-for="mess in arrMessgae">
          <Message
            :content="mess.message"
            :is-server="mess.is_server"
            :loading="mess.loading"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full bg-slate-100 p-2 rounded-1 text-center items-center justify-center"
    >
      <form @submit.prevent="sendQuestion">
        <InputGroup>
          <InputText class="w-full border-1 p-2" v-model="message" />
          <Button
            :loading="loading"
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
