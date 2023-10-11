<template>
  <div>
    <Header></Header>

    <div class="upload">
      <p>Upload an incident report</p>
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:9999/upload"
          multiple
          @success="handleUploadSuccess"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drag here or, <em>select from your computer</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            xxx files with a size less than 500kb
          </div>
        </template>
      </el-upload>
      <div>
        <button class="btn sub" @click="submitFile">Submit</button>
        <button class="btn" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/home/Header.vue";
import { UploadFilled } from '@element-plus/icons-vue'

export default {
  components: {
    UploadFilled,
    Header,
  },
  data() {
    return {
      fileContent: '',
    };
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
        this.filePath = response.filePath;
        console.log(response.message);
    },
    submitFile() {
        this.$router.push({
            name: 'Annotation',
            query: { filePath: this.filePath }
        });
    },
    cancel() {
      // 在这里可以取消上传操作
    },
  },
};
</script>

<style scoped>
.upload {
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
}

.btn {
  float: right;
  margin-right: 20px;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.sub {
  background-color: rgb(98, 29, 186);
  color: white;
}
</style>
