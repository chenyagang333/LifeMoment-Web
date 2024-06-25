<template>
  <div
    class="hugs-popover-wrap"
    :class="animationClass"
    @mouseenter="handleDisplay(true)"
    @mouseleave="handleDisplay(false)"
  >
    <a class="default-entry">
      <div class="animation">
        <slot name="default"></slot>
      </div>
      <template v-if="$slots.second">
        <div class="second">
          <slot name="second"></slot>
        </div>
      </template>
    </a>
    <Transition name="hugs-popover">
      <div
        class="popover"
        v-if="!keepDom && display"
        v-show="display"
        :style="popoverStyle"
      >
        <div
          class="popover-wrap"
          :class="popoverWrapClass"
          :style="popoverWrapStyle"
        >
          <slot name="popover"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  openCard?: boolean;
  position?: string; // br,bc
  distance?: string; // padding-top
  trigger?: string; //
  animation?: string; //
  keepDom?: boolean;
}>();

const display = ref(false);
const handleDisplay = (_display: boolean) => {
  // const handleDisplay = (_display: boolean, showType?: string) => {
  // if (props.showType !== showType) return
  //   if (_display) {
  display.value = _display;
  //   }
};
// 出现位置
const popoverWrapClass = ref(""); // 内层popover
popoverWrapClass.value = props.position ?? "bc"; // 内层popover
const popoverStyleSelect: any = {
  t: { bottom: "100%" },
  r: { left: "100%" },
  b: { top: "100%" },
  l: { right: "100%" },
};
const popoverStyle = popoverStyleSelect[popoverWrapClass.value[0]]; // 外层popover
// 动画
const animationClass = ref("");
animationClass.value = props.animation ?? "";
// 触发方式

const popoverWrapStyle = {} as any; // 内层popover
popoverWrapStyle.paddingTop = props.distance ? props.distance + "px" : ""; // 内层popover
</script>

<style lang="scss" scoped>
// ,
.hugs-popover-leave-active{
  transition: all 0.1s ease-in-out;
}
.hugs-popover-enter-active {
  transition: all 0.36s ease-in-out;
}

.hugs-popover-enter-from,
.hugs-popover-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.hugs-popover-wrap {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  .default-entry {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    .animation {
      align-items: center;
      display: flex;
    }
    .second {
      height: 15px;
      line-height: 15px;
      font-size: 13px;
      font-weight: 400;
      font-family: inherit;
    }
  }

  .popover {
    position: absolute;
    cursor: pointer;
    z-index: 3;
    width: 100%;

    .popover-wrap {
      cursor: default;
      position: absolute;
    }
    .bl,
    .bc,
    .br {
      top: 100%;
    }

    .bc {
      left: 0%;
    }
    .bc {
      left: 50%;
      transform: translateX(-50%);
    }

    .br {
      right: 0%;
    }
  }
}
// 动画
.dance {
  cursor: pointer;

  @keyframes dance {
    0% {
      transform: translateY(0);
    }

    60% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  &:hover .animation {
    animation: dance 0.25s 1 ease;
  }
}
</style>
