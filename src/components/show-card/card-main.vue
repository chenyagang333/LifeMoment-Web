<template>
  <div class="card-main">
    <div class="content" v-html="content"></div>
    <div class="main-files" v-if="files && files.length > 0">
        <!-- <div class="files" v-for="(i, index) in srcList" :key="index">
            <el-image :src="i" fit="cover" />
        </div> -->
        <template v-if="files.length === 1">
            <img class="signal-image radius-overflow" v-if="files[0].type === FileType.image"
                :src="FileIP + files[0].firstURL"></img>
            <div class="signal-video radius-overflow" v-if="files[0].type === FileType.video">
                <video :src="FileIP + files[0].firstURL" autoplay controls />
            </div>
        </template>
        <div class="multiple-file" :class="fileNumTypeClass" v-else>
            <div class="files radius-overflow" v-for="(i, index) in files" :key="index">
                <el-image v-if="i.type === FileType.image" :src="FileIP + i.firstURL" fit="cover" />
                <el-image v-if="i.type === FileType.video" :src="FileIP + i.secondURL" fit="cover" />
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed,getCurrentInstance  } from "vue";
import { MyFileInfo } from '@/types/Layout1/youshow/youshow';
import { FileType } from "@/utils/FileUtils/FileType";

const app = getCurrentInstance()
const FileIP = app?.appContext.config.globalProperties.$FileIP

const props = defineProps<{
  content: string;
    files?: MyFileInfo[];
}>();

const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

const fileNumTypeClass = computed(() => (props.files?.length === 2 || props.files?.length === 4) ? 'num-type-one' : 'num-type-two')



</script>

<style lang="scss" scoped>
.card-main {
  padding: 5px 20px 0 80px;
  .content {
    line-height: 1.5;
    font-size: 15px;
    width: 100%;
    color: #000000;
    word-break: break-all;
  }

  .main-files {
    $multiple-file-width: 409px;
    $gridGap: 5px;
    margin: 10px 0;


    .signal-image {
        max-height: 240px;
        max-width: 100%;
        cursor: -webkit-zoom-in;
        cursor: zoom-in;

        &:hover {
            filter: brightness(90%);
            /* 悬停时降低图片亮度，实现遮罩效果 */
        }
    }

    .signal-video {
        height: 300px;
        width: 100%;
        background-color: black;

        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .multiple-file {
        display: grid;
        width: $multiple-file-width;
        grid-gap: 5px;
        .files {
            position: relative;
            &::after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                cursor: -webkit-zoom-in;
                cursor: zoom-in;
            }
            &:hover {
                &::after {
                    background-color: rgb(0, 0, 0, 0.2);
                }
            }
            >.el-image {
                width: 100%;
                height: 100%;
            }
        }
    }
    
    .num-type-one {
        grid-template-columns: repeat(2, 1fr
        );
    $fileWH: calc(($multiple-file-width - $gridGap) / 2);

    .files {
        width: $fileWH;
        height: $fileWH;
    }
}
    .num-type-two {
        grid-template-columns: repeat(3, 1fr);
        $fileWH: calc(($multiple-file-width - $gridGap * 2) / 3)
            ;

        .files {
            width: $fileWH;
            height: $fileWH;
        }
    }


}

}
</style>
