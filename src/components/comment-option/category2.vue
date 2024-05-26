<template>
    <div class="option" :class="optionClass">
        <i class="bi" :class="optionbiClass" :style="{ fontSize: size + 'px' }"></i>
        <span class="count" :style="{ fontSize: size ? (size - 2) + 'px' : '' }">{{ text ?? count ?? 0 }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    type: string
    size?: number
    text?: string
}>();
const emit = defineEmits<{
    // (e: "clickHandle"): void;
}>();


const count = defineModel<number>('count');

const optionbiClass = ref<any>({})
const optionClass = ref<any>({})


const optionsbi = {
    chat: 'bi-chat-dots',
    share: 'bi-box-arrow-up-right'
} as any
const options = {
    chat: 'chat-color',
    share: 'share-color'
} as any
const keyExists = optionsbi.hasOwnProperty(props.type);
if (keyExists) {
    optionbiClass.value = optionsbi[props.type]
    optionClass.value = options[props.type]
} else {
    throw Error("输入的属性type值有误")
}
</script>

<style lang="scss" scoped>
.option {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;

    color: #5c5c5c;
    .bi {
        font-size: 20px;
    }

    .count {
        font-size: 15px;
        margin-left: 5px;

    }
}
.chat-color:hover{
    color: pink;
}
.share-color:hover{
    color: skyblue;
}
</style>