<script setup>
import Header from "@/components/home/Header.vue";
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<template>
<div>
  <Header></Header>

  <div class="upload">
    <p>Up load an incident report</p>
  <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drag here or,<em> select from your computer</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        xxx files with a size less than 500kb
      </div>
    </template>
  </el-upload>
    <div>
      <button class="btn sub" @click="">Submit</button>
      <button class="btn" @click="">Cancel</button>
    </div>

  </div>
</div>
</template>

<style scoped>
.upload{
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
}

.btn{
  float: right;
  margin-right: 20px;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.sub{
  background-color: rgb(98, 29, 186);
  color: white;
}
</style>