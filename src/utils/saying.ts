const sayingMap = [
    'It\'s real like a dream,My heart will go on.',
    '时光如白驹过隙，忽然而已。偶有飞絮撩发，赏心悦目。',
    '人总该找到自己的价值。',
    'Follow your heart, no matter what happens!',
    '路虽远，行则将至。事虽难，做则必成。',
]
const getRandom = () => {
    return Math.floor(Math.random() * sayingMap.length);
}
import { ref, onMounted, onUnmounted } from 'vue' 
// 按照惯例，组合式函数名以“use”开头
export function useSaying() {
    const saying = ref(sayingMap[getRandom()]);
    const timer = ref();
    onMounted(() => {
        timer.value = setInterval(() => {
            saying.value = sayingMap[getRandom()];
            // 定时器的逻辑...
        }, 9000);
    })
    onUnmounted(() => {
        clearInterval(timer.value);
    })
    // 通过返回值暴露所管理的状态
    return saying 
}