<template>
  <div
    class="comment-input"
    :placeholder="placeholder"
    :style="{minHeight:minHeight}"
    contenteditable
    ref="commentBoxRef"
    @blur="blurCommentBox"
    @focus="focusCommentBox"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";

defineProps<{
  placeholder:string
  minHeight?:string
}>();

const commentBoxRef = ref(null) as any; // 定义 ref.
const emit = defineEmits<{
  (e: "custom-blur"): void;
  (e: "custom-focus"): void;
}>();

//#region 事件处理

let oldRange: any;
const blurCommentBox = () => {
  // 焦点失去事件
  oldRange = window.getSelection()?.getRangeAt(0); // 记录 点击编辑文本区域外部前的 光标位置
  emit("custom-blur");
};
const focusCommentBox = () => {
  // 获的焦点事件
  if (oldRange) {
    // 根据oldRange恢复原来的光标位置
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(oldRange);
  }
  emit("custom-focus");
};
const enterEmotion = (imgURL: string) => {
  // 让输入框重新获得焦点
  commentBoxRef.value.focus();
  // 如果光标不在评论框中
  if (document.activeElement !== commentBoxRef.value) {
    const position = commentBoxRef.textContent.length;
    const range = document.createRange();
    range.setStart(commentBoxRef.firstChild, position);
    range.setEnd(commentBoxRef.firstChild, position);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  // 保存当前光标位置和范围
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  // 创建图片元素并设置其属性
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", imgURL);
  // `https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${imgIndex}.gif`
  // 在图片后插入一个文本节点
  const textNode = document.createTextNode("\u200B"); // 一个零宽度空格，用于定位光标
  range?.insertNode(textNode);
  textNode.parentNode?.insertBefore(imgElement, textNode.nextSibling);
  // 移除插入的零宽度空格节点
  textNode.parentNode?.removeChild(textNode);
  // 设置新范围以将光标定位在图片末尾
  const newRange = document.createRange();
  newRange.setStartAfter(imgElement);
  newRange.setEndAfter(imgElement);
  // 清除所有选区并将新的范围添加到选区中
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};

//#endregion


//#region 组件对外暴露事件

// 父组件 激活窗口，刷新窗口的状态
const focusTextArea = () => {
  commentBoxRef.value?.focus();
  emit("custom-focus");
};
const getInnerHTML = () => {
  return commentBoxRef.value.innerHTML;
};
const setInnerHTML = (html: string) => {
  commentBoxRef.value.innerHTML = html;
};
const clearInnerHTML = () => {
  commentBoxRef.value.innerHTML = '';
};
defineExpose({ enterEmotion, focusTextArea, getInnerHTML,setInnerHTML,clearInnerHTML });

//#endregion
onMounted(() => {});
// 自定义指令参数，点击外部区域的处理函数，如关闭弹窗
</script>

<style lang="scss" scoped>
.comment-input {
  padding: 7px 10px;
  font-size: inherit;
  overflow: hidden;
  // resize: both;
  // height: 100%;
  cursor: text;

  border: none;
  font-size: 15px;
  transition: border 0.3s;
  color:#333;
  font-weight: 500;
  &:empty::before {
    content: attr(placeholder);
    color: #a3a3a3;
  }
}
</style>
