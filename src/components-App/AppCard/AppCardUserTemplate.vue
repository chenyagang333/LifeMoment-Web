<template>
  <el-skeleton :rows="5" animated style="--el-skeleton-circle-size: 50px">
    <template #template>
      <div style="display: flex">
        <el-skeleton-item variant="circle" />
        <div
          style="
            width: calc(100% - 60px);
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding-top: 5px;
            margin-left: 7px;
          "
        >
          <el-skeleton-item variant="text" style="width: 40%; height: 17px" />
          <el-skeleton-item variant="text" style="width: 60%; height: 17px" />
          <el-skeleton-item
            variant="text"
            style="width: 100%; margin-top: 5px"
          />
          <el-skeleton-item variant="text" style="width: 100%" />
          <el-skeleton-item
            variant="text"
            style="width: 70%; margin-bottom: 10px"
          />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts"></script>

<style scoped></style>
