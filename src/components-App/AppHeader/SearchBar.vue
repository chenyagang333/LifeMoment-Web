<template>
  <div class="SearchBar">
    <div class="search-bar" v-click-outside="hideBottomBox">
      <div class="search-row">
        <input
          class="search-input"
          v-model="searchKeyWord"
          @click="showBottomBox"
          @keyup.enter="goSearch"
          placeholder="搜你想搜"
        />
        <div class="search-icon" @click="goSearch">
          <el-icon size="21" color="var(--jinn-text-color1)"><Search /></el-icon>
        </div>
      </div>
      <div class="search-b-box" v-show="searchBottomBox">
        <div class="search-record" v-if="searchHistory.length > 0">
          <div class="header">
            <div class="title">搜索历史</div>
            <el-button size="small" @click="clearHistory">清空</el-button>
          </div>
          <div class="record-box">
            <el-tag
              v-for="tag in searchHistory"
              :key="tag"
              closable
              type="info"
              :disable-transitions="false"
              @close="handleClose(tag)"
              @click="handleClick(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
        <!-- <div class="search-hot">
          <div class="header">
            <div class="title">WeStrength热搜</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ElMessage, ClickOutside as vClickOutside } from "element-plus";

const router = useRouter();
const route = useRoute();

const searchKeyWord = ref<string>((route.query.keyword as string) ?? "");
const searchBottomBox = ref<boolean>(false);

const showBottomBox = () => {
  if (!searchBottomBox.value) {
    searchBottomBox.value = true;
  }
};
const hideBottomBox = () => {
  if (searchBottomBox.value) {
    searchBottomBox.value = false;
  }
};

// 搜索框参数刷新后重新搜索
onBeforeRouteUpdate((to) => {
  const keyword = to.query.keyword as string;
  if (keyword) {
    searchKeyWord.value = keyword;
    updateSort(keyword);
  }
  // to and from are both route objects.
});
const goSearch = () => {
  if (!searchKeyWord.value) {
    ElMessage.info("请先输入搜索关键词！");
    return;
  }
  hideBottomBox();
  updateSort(searchKeyWord.value);
  const href = router.resolve({
    //使用resolve
    name: "search", //这里是跳转页面的name
    path: "/search",
    query: { keyword: searchKeyWord.value },
  });
  if (route.fullPath.includes("/search")) {
    router.push(href.href);
  } else {
    // 点击事件
    window.open(href.href, "_blank");
  }
};

const searchHistory = ref<string[]>([]);

const getSearchHistory = () => {
  const _searchHistory = localStorage.getItem("LifeMomentSearchHistory"); // 获取搜索历史
  if (_searchHistory) {
    searchHistory.value = JSON.parse(_searchHistory);
  }
};
const setSearchHistory = () => {
  const str = JSON.stringify(searchHistory.value);
  localStorage.setItem("LifeMomentSearchHistory", str); // 存储搜索历史
};

const updateSort = (keyword: string) => {
  const index = searchHistory.value.indexOf(keyword);
  if (index !== -1) {
    if (index === 0) return;
    searchHistory.value.splice(index, 1);
  }
  searchHistory.value.splice(0, 0, keyword);
  setSearchHistory();
};

const handleClose = (tag: string) => {
  const index = searchHistory.value.indexOf(tag);
  searchHistory.value.splice(index, 1);
  setSearchHistory();
};
const clearHistory = () => {
  searchHistory.value = [];
  setSearchHistory();
};

const handleClick = (tag: string) => {
  searchKeyWord.value = tag;
  goSearch();
};

onMounted(() => {
  getSearchHistory();
});
</script>

<style scoped lang="scss">
.SearchBar {
  width: 400px;
  height: 40px;
  position: relative;
  .search-bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--jinn-bg2);
    width: 100%;
    border-radius: var(--el-border-radius-base);
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--el-border-color);
    &:hover {
      background-color: var(--jinn-bg4);
      .search-row {
        .search-input {
          border: 1px solid var(--el-border-color);
        }
      }
    }
    .search-row {
      padding: 5px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search-input {
        border-radius: var(--el-border-radius-base);
        height: 100%;
        width: calc(100% - 45px);
        border: 1px solid rgb(255, 255, 255, 0);
        background-color: rgb(255, 255, 255, 0);
        padding-left: 7px;
        font-size: 15px;
        color: var(--jinn-text-color1);
        &:focus {
          background-color: var(--jinn-bg3);
        }
      }
      .search-icon {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease-in-out;
        border-radius: var(--el-border-radius-base);
        margin-right: 5px;
        &:hover {
          background-color: var(--jinn-bg2);
        }
      }
    }
    .search-b-box {
      width: 100%;
      background-color: var(--jinn-bg4);
      .search-record,
      .search-hot {
        .header {
          width: 100%;
          padding: 5px;
          padding-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-size: 16px;
            color: var(--jinn-text-color1);
          }
        }
      }
      .search-record {
        padding: 10px;
        padding-top: 0;
        .record-box {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          .el-tag {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
