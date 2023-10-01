<template>
  <div>
    <Header></Header>

    <div class="upload">
      <p>Upload an incident report</p>
      <!--
        <el-upload
        class="upload-demo"
        drag
        action="/upload"
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
      -->
      <div>
        <input
          type="file"
          @change="handleFileChange"
        />
        <button class="btn sub" @click="submitFile">Submit</button>
        <button class="btn" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/home/Header.vue";
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios';

let myfile = null; 

//ensures only one file (the first one) is submitted
const handleFileChange = () => {
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput.files.length > 0) {
    myfile = fileInput.files[0];
    console.log('Selected File:', myfile);
  }
};


const submitFile = () => {

  if (!myfile) {
console.log("no file selected")
    return;
  }

  const formData = new FormData();
  formData.append('file', myfile);

  axios
    .post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
     //success
      console.log(response.data);
    })
    .catch((error) => {
      //error handling
      console.error(error);
    });
};



const cancel = () => {
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
