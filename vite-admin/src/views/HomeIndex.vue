<template>
  <div class="home-page">
    <div class="home-content">
      <!-- <svg-icon name="ii-logo" width="64px" height="64px"></svg-icon> -->
      <div class="role-item">
        <h3>角色1：图书员</h3>
        <p style="margin-left: 20px;">权限： ["article-index", "article-category"]</p>
      </div>
      <div class="role-item">
        <h3>角色2：管理员</h3>
        <p style="margin-left: 20px;">权限： ["role-index", "manager-index", "article-index", "article-category"]</p>
      </div>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
.home-content {
  margin: 20px;
}
.role-item{
  margin-bottom: 20px;
}
</style>