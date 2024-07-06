import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// 监听浏览器的回退行为来关闭弹窗
export default function useEventListenerPopstate(_visible: boolean = false) {
  const router = useRouter();
  const notPopstateBack = ref<boolean>(true);
  const visible = ref<boolean>(_visible);

  // Function to push state to history
  const pushHistory = () => {
    const state = { title: 'title', url: '#' };
    window.history.pushState(state, state.title, state.url);
  };

  // Handle popstate event
  const handlePopstate = () => {
    if (visible.value) {
      notPopstateBack.value = false; // 是浏览器的回退行为改变的的下面的 visible.value
      visible.value = false;
    }
  };

  // Watch for changes in 'visible' ref
  watch(visible, (newValue) => {
    if (newValue) {
      pushHistory();
    } else {
      if (notPopstateBack.value) {
        router.back();
      }
      notPopstateBack.value = true; // 刷新状态
    }
  });

  // Listen to popstate event on component mount
  onMounted(() => {
    window.addEventListener('popstate', handlePopstate);
  });

  // Remove popstate listener on component unmount
  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopstate);
  });
  return { visible }
}