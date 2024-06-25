<template>
  <div class="AppTabs">
    <q-tabs v-model="drawerTab" class="bg-grey-1" dense align="justify">
      <q-tab class="text-orange" name="TA" label="TA的作品" />
      <q-tab class="text-cyan" name="comment" label="评论" />
      <!-- <q-tab class="text-red" name="movies" label="Movies" /> -->
    </q-tabs>
    <q-tab-panels keep-alive v-model="drawerTab" animated>
      <!-- 他的作品 -->
      <q-tab-panel name="TA">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <slot name="TA"></slot>
      </q-tab-panel>
      <!-- ----------------------------评论区----------------------------- -->
      <q-tab-panel name="comment">
        <!-- <JinnComment
          :showId="showId"
        ></JinnComment> -->
        <AppComment
          :showId="showId"
          v-model:comment-count="commentCount"
        ></AppComment>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JinnComment from "@/components/jinn-components/jinn-comment/jinn-comment.vue";
import AppComment from "@/components-App/AppComment/AppComment.vue";

const props = defineProps<{
  showId: number;
}>();

const commentCount = defineModel<number>("commentCount", {
  required: true,
  default: 0,
});

const drawerTab = ref("comment");
</script>

<style scoped>
.AppTabs {
  height: 100%;
}
.q-tab-panels{
  height: 100%;
  
}
.q-panel{
  height: 100%;
}
.q-tab-panel{
    height: calc(100% - 36px) ;
}
</style>
