<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0">
        <Header></Header>
      </el-header>
      <el-container id="aside" width="300px">
        <el-aside width="250px">
          <Aside></Aside>
        </el-aside>
        <el-main id="main">This is where your main content is displayed</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "@/components/admin/Aside.vue";
import Header from "@/components/admin/Header.vue";
</script>


<style scoped>

#main{
  border: 1px solid black;
  margin-left: 10px;
}
#aside{
}


</style>