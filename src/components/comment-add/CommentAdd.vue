<template>
  <!-- https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif -->
  <div class="comment-add">
    <div class="textImgArea" :class="textImgAreaClass">
      <div class="reply-top" v-if="isReply" @mousedown="mousedownEmotion">
        <span class="user-name">
          <span>回复@{{ toUserName }}</span>
        </span>
        <CloseBold class="close-svg" @click.stop="closeReplyState" />
      </div>
      <!-- <div class="commentBox" :class="commentBoxClass" placeholder="2024在youshow.com记录生活的你必定所向披靡：请输入你的评论" contenteditable
        ref="commentBoxRef" @blur="blurCommentBox" @focus="focusCommentBox"></div> -->
      <!-- <custom-input :class="commentBoxClass" placeholder="2024在youshow.com记录生活的你必定所向披靡：请输入你的评论" contenteditable
        ref="commentBoxRef" @blur="blurCommentBox" @focus="focusCommentBox"></custom-input> -->
      <div
        class="text-content"
        :style="{ minHeight: minHeight}"
      >
        <custom-input
          ref="customInput"
          placeholder="hugs.com记录美好生活：请输入你的评论"
          :class="commentBoxClass"
          :minHeight="minHeight"
          @custom-blur="() => blurCommentBox()"
          @custom-focus="() => focusCommentBox()"
        ></custom-input>
      </div>
    </div>
    <div class="options">
      <div class="left" @mousedown="mousedownEmotion">
        <emotion
          placement="top-end"
          @enter-emotion="(e: number) => 
        customInput.enterEmotion(`/src/assets/emotions/${e}.gif`)"
        ></emotion>
      </div>
      <div class="right">
        <el-checkbox v-model="isSecret" label="私密评论" size="large" />
        <el-button size="small" @click="pushHandle">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref} from "vue";
import emotion from "./emotion/index.vue";
import { onMounted } from "vue";
import CustomInput from "./CustomInput.vue";

defineProps<{
  minHeight?: string; // 
  toUserName?: string; // 回复对象用户名
}>();

const isReply = defineModel(); // 是否是回复评论类型的输入框

const commentBoxClass = ref("");
const textImgAreaClass = ref("");

const isSecret = ref(false); // 是否是私密评论
const emit = defineEmits<{
  (e: "push-handle", html: string): void;
}>();

//#region 事件处理

const customInput = ref(null) as any;
// 焦点失去事件
const blurCommentBox = () => {
  textImgAreaClass.value = ""; // 失去焦点去除边框style
};
// 如果回复消息的评论框则激活外层div显示不同的边框
const focusCommentBox = () => {
  textImgAreaClass.value = "textImgAreaCover"; // 获得焦点边框渐变
};
// 点击选择表情按钮时光标不会消失，阻止浏览器的默认行为
const mousedownEmotion = (e: any) => {
  e.preventDefault();
};

// 父组件 激活窗口，刷新窗口的状态
const focusTextArea = async () => {
  customInput.value.focusTextArea();
};
defineExpose({ focusTextArea });
const closeReplyState = () => {
  // 关闭回复消息状态
  isReply.value = false;
  customInput.value.focusTextArea();
};

//#endregion

//#region 发布评论

const pushHandle = async () => {
  const html = customInput.value.getInnerHTML();
  emit("push-handle", html);
  customInput.value.clearInnerHTML();
};

//#endregion
onMounted(() => {});
// 自定义指令参数，点击外部区域的处理函数，如关闭弹窗
</script>

<style lang="scss" scoped>
@import "./AddComment.scss";
</style>
