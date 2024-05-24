<template>
  <div class="JinnSignInFriend">
    <div class="text">今日已有 {{ num }} 位好友打卡</div>
    <div class="list">
      <div class="item" v-for="(i, index) in data">
        <img :src="i.img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type FriendDataType = {
  img: string;
  href: string;
};
defineProps<{
  num: number;
  data: FriendDataType[];
}>();
</script>

<style scoped lang="scss">
.JinnSignInFriend {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 10px;
  .text {
    margin-bottom: 10px;
    font-size: 14px;
    color: #7c7c7c;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 50px;
    margin-bottom: -5px;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .item {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rebeccapurple;
      overflow: hidden;
      margin: 0 5px 5px 5px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
