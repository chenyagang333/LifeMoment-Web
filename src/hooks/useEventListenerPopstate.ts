import { useAppStore } from '@/stores/app/app';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

// 监听浏览器的回退行为来关闭弹窗
export default function useEventListenerPopstate(_mark: string = '', _visible: boolean = false) {
  const router = useRouter();
  const notPopstateBack = ref<boolean>(true);
  const visible = ref<boolean>(_visible);

  const appStore = useAppStore();

  // Function to push state to history
  const pushHistory = () => {
    // 添加浏览器返回事件监听
    window.addEventListener('popstate', handlePopstate);
    const state = { title: 'title', url: '' };
    window.history.pushState(state, state.title, state.url);
    appStore.historyMarks.push(_mark) // 添加
  };

  // Handle popstate event
  const handlePopstate = (event: any) => {
    // 只回退上一个记录
    const isOk = appStore.historyMarks[appStore.historyMarks.length - 1] === _mark;
    if (visible.value && isOk) {
      notPopstateBack.value = false; // 是浏览器的回退行为改变的的下面的 visible.value
      visible.value = false;
    }
  };

  // Watch for changes in 'visible' ref
  watch(visible, (newValue) => {
    if (newValue) {
      pushHistory();
    } else {
      // 延迟删除回退记录，防止多个事件并发顺序执行，导致的连续退出多个弹窗
      setTimeout(() => {
        // 取消浏览器返回事件监听
        window.removeEventListener('popstate', handlePopstate);
        // 删除返回记录标记
        appStore.historyMarks = appStore.historyMarks.filter(m => m !== _mark)
      }, 100);
      // 如果不是通过浏览器返回则使用router 返回
      if (notPopstateBack.value) {
        router.back();
      } else { }
      // 刷新返回状态，默认不是浏览器返回
      notPopstateBack.value = true; // 刷新状态
    }
  });

  // Listen to popstate event on component mount
  onMounted(() => {
    // 如果初始变量为 true，则直接添加记录
    if (_visible) {
      pushHistory();
    }
  });

  // Remove popstate listener on component unmount
  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopstate);
  });
  return { visible }
}