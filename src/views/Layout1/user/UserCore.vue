<template>
  <div class="User">
    <div class="containerOuter">
      <div class="container">
        <div class="Up">
          <div class="userData">
            <el-avatar
              v-if="userData?.userAvatar"
              :size="112"
              :src="FileIP + userData?.userAvatar"
            />
            <div class="data">
              <div class="userName">{{ userData?.userName }}</div>
              <div class="userQ">
                <div class="option">
                  关注
                  <div class="value">{{ userData?.attentionCount }}</div>
                </div>
                <div class="option">
                  粉丝
                  <div class="value">{{ userData?.fansCount }}</div>
                </div>
                <div class="option">
                  获赞
                  <div class="value">{{ userData?.getLikeCount }}</div>
                </div>
              </div>
              <div class="account">
                <div class="lable">
                  LifeMoment账号：<span class="value">{{
                    userData?.userAccount
                  }}</span>
                </div>
              </div>
              <JinnDescription
                class="description"
                color="var(--jinn-text-color1)"
                :content="userData?.description"
              ></JinnDescription>
            </div>
          </div>
          <div class="options">
            <template v-if="userId == myUserData.userData?.id">
              <el-button @click="visibleEdit = true">编辑资料</el-button>
              <!-- 编辑用户资料 -->
              <el-dialog
                v-model="visibleEdit"
                align-center
                title="编辑资料"
                width="500"
                :fullscreen="appStore.isMobile"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <UploadImg
                    v-model:image-url="userAvatar"
                    :drag="false"
                    border-radius="50%"
                  >
                    <template #empty>
                      <el-icon><Avatar /></el-icon>
                      <span>请上传头像</span>
                    </template>
                    <!-- <template #tip> 圆形组件（禁止拖拽上传） </template> -->
                  </UploadImg>
                  <el-form
                    label-position="top"
                    label-width="auto"
                    :model="formLabelAlign"
                    style="width: 80%"
                  >
                    <el-form-item label="名字">
                      <el-input v-model="formLabelAlign.userName" />
                    </el-form-item>
                    <el-form-item label="简介">
                      <el-input
                        v-model="formLabelAlign.description"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                      />
                    </el-form-item>
                  </el-form>
                </div>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="visibleEdit = false">取消</el-button>
                    <el-button type="primary" @click="handleOk">
                      修改
                    </el-button>
                  </div>
                </template>
              </el-dialog>
              <!-- <a-modal
                title-align="start"
                v-model:visibleEdit="visibleEdit"
                @ok="handleOk"
                @cancel="handleCancel"
              >
                <template #title> 编辑资料 </template>
              </a-modal> -->
            </template>
          </div>
        </div>
        <div class="Down">
          <el-tabs v-model="tabsKey" class="demo-tabs" @tab-change="changeTabs">
            <el-tab-pane label="作品" name="production">
              <template #label>
                <div class="tabs-title">
                  <i class="bi bi-file-earmark-richtext"></i>
                  <span> 作品 {{ userData?.contentCount }}</span>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="喜欢" name="like">
              <template #label>
                <div class="tabs-title">
                  <i class="bi bi-heart-fill"></i>
                  <span> 喜欢 {{ userData?.likeCount }}</span>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="收藏" name="star">
              <template #label>
                <div class="tabs-title">
                  <i class="bi bi-star-fill"></i>
                  <span> 收藏 {{ userData?.starCount }}</span>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
          <div class="custom-tab-pane">
            <UserLifeMoment
              :userId="userId"
              :type="tabsKey"
              v-if="showUserLifeMoment"
            ></UserLifeMoment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JinnDescription from "@/components/jinn-components/jinn-text/jinn-description/JinnDescription.vue";
import { ref, getCurrentInstance, onMounted, nextTick, reactive } from "vue";
import UserLifeMoment from "./components/UserLifeMoment.vue";
import { ApiResult, get, post } from "@/api/AHttp/api";
import { UserData } from "@/stores/user/user";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/user";
import UploadImg from "@/components/Upload/img.vue";
import { ElMessage } from "element-plus";
import useEventListenerPopstate from "@/hooks/useEventListenerPopstate";
import { useAppStore } from "@/stores/app/app";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const props = defineProps<{
  userId: number;
}>();

const app = getCurrentInstance();
const FileIP: string = app?.appContext.config.globalProperties.$FileIP;

const myUserData = useUserStore();

const type = route.query.type as string;
const tabsKey = ref<string>((type == "" ? null : type) ?? "production");

const userData = ref<UserData>();
const getUserDataByUserId = async (userId: number) => {
  const res: ApiResult<UserData> = await get("User/GetUserDataById", {
    userId,
  });
  if (res.code == 200) {
    userData.value = res.data;
    setUserData(userData.value);
  }
};

onMounted(() => {
  getUserDataByUserId(props.userId);
});

const showUserLifeMoment = ref<boolean>(true);

const changeTabs = async () => {
  showUserLifeMoment.value = false;
  await nextTick();
  showUserLifeMoment.value = true;
};

// 编辑用户资料
const { visible: visibleEdit } = useEventListenerPopstate();
const userAvatar = ref<string>("");
const handleOk = async () => {
  const relative = userAvatar.value.replace(FileIP, "");
  const res = await post("User/EditUserData", {
    ...formLabelAlign,
    userAvatar: relative,
  });
  if (res.code == 200) {
    ElMessage.success("编辑成功！");
    handleOkSetData(relative);
    visibleEdit.value = false;
  } else {
    ElMessage.error("编辑失败");
  }
};

const formLabelAlign = reactive({
  userName: "",
  description: "",
});

const setUserData = (data: UserData) => {
  userAvatar.value = FileIP + userData?.value?.userAvatar;
  formLabelAlign.userName = data.userName;
  formLabelAlign.description = data.description;
};

const handleOkSetData = (relative: string) => {
  userData.value!.userAvatar = myUserData.userData!.userAvatar = relative; // 更新头像
  userData.value!.userName = myUserData.userData!.userName =
    formLabelAlign.userName; // 更新用户名
  userData.value!.description = formLabelAlign.description; // 更新简介
};
</script>

<style scoped lang="scss">
.User {
  display: flex;
  justify-content: space-between;
  font-family: PingFang SC, DFPKingGothicGB-Medium, sans-serif;
  width: 70%;
  @include mobile {
    width: 100%;
  }
  .containerOuter {
    width: 100%;
    .container {
      width: 100%;
      // padding-right: 240px;
      // padding-left: 160px;
      .Up {
        height: 233px;
        padding-top: 90px;
        border-bottom: 1px solid var(--jinn-color3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        @include mobile {
          padding-right: 10px;
          padding-left: 10px;
        }
        .userData {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 80%;
          .el-avatar {
            border: 1px solid var(--jinn-color1);
          }
          .data {
            display: flex;
            flex-direction: column;
            gap: 5.1px;
            width: calc(100% - 132px);
            .userName {
              font-size: 20px;
              color: var(--jinn-text-color1);
            }
            .userQ {
              display: flex;
              align-items: center;
              gap: 20px;
              .option {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: var(--jinn-text-color2);
                .value {
                  font-size: 15px;
                  color: var(--jinn-text-color1);
                  padding-left: 6px;
                }
              }
            }
            .account {
              font-size: 12px;
              color: var(--jinn-text-color2);
            }
            .description {
              font-size: 13px;
              width: 86%;
              color: var(--jinn-text-color1);
            }
          }
        }
        .options {
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          .el-button {
            margin-bottom: 20px;
          }
        }
      }
      .Down {
        .tabs-title {
          width: 100px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 17px;
          .bi {
            font-size: 18px;
            padding-right: 5px;
          }
          .bi-file-earmark-richtext {
            color: skyblue;
          }
          .bi-heart-fill {
            color: red;
          }
          .bi-star-fill {
            color: orange;
          }
        }
      }
    }
  }
}
</style>
