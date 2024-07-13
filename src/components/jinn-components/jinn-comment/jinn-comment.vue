<template>
  <div class="jinn-comment">
    <div class="jinn-comment-avatar">
      <slot name="avatar"></slot>
    </div>
    <div class="jinn-comment-content">
      <div class="jinn-comment-content-inner">
        <div class="jinn-comment-content-author-name" v-if="$slots.author">
          <slot name="author"></slot>
        </div>
        <div class="jinn-comment-content-detail" v-if="$slots.content">
          <slot name="content"></slot>
        </div>
        <div class="jinn-comment-content-author-time" v-if="$slots.datetime">
          <slot name="datetime"></slot>
        </div>
        <div class="jinn-comment-actions" v-if="$slots.actions">
          <slot name="actions"></slot>
        </div>
        <div class="jinn-comment-options" v-if="$slots.options">
          <slot name="options"></slot>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// const props = withDefaults(defineProps<{}>(), {});
</script>

<style lang="scss" scoped>
.jinn-comment {
  width: 100%;
  padding: 5px 0;
  display: flex;
  position: relative;
  .jinn-comment-avatar {
    margin-right: 5px;
  }
  .jinn-comment-content {
    flex: 1;
    .jinn-comment-content-inner {
      &:hover {
        .jinn-comment-options {
          display: block;
        }
      }
      .jinn-comment-content-author-name {
        color: #ffbf47;
      }
      .jinn-comment-content-detail {
        margin-top: 7px;
        word-wrap: break-word;
        color: var(--jinn-text-color1);
        font-size: 14.5px;
      }
      .jinn-comment-content-author-time {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
        color: #9f9f9f;
      }
      .jinn-comment-actions {
        margin-top: 5px;
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .jinn-comment-options {
        display: none;
        position: absolute;
        top: 5px;
        right: 10px;
      }
    }
  }
}
</style>
