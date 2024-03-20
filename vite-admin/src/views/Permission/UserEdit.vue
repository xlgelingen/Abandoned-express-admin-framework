<script setup>
import { ref, reactive, onMounted } from 'vue';
import userService from '@/services/user';
import { useRoute } from 'vue-router';
import {getEditUser} from '@/utils/user.js'
const route = useRoute();
const userId = ref(route.params.id);

var editUser = reactive({});

onMounted(async () => {
    try {
        var userInfo = await getEditUser({id: userId.value});
        Object.assign(editUser, userInfo)
        console.log('用户编辑/editUser', editUser);
    } catch (error) {
        console.error('获取编辑用户信息失败：', error);
    }
});

async function saveUser(){
    if(!userId.value || !editUser.name || !editUser.phone || !editUser.password || !editUser.role){
        alert('params empty!')
    }
    await userService.editUser({ id: userId.value, name: editUser.name, phone: editUser.phone, password: editUser.password, role: editUser.role }).then(function (data) {
        if (data.code === 200) {
            alert('修改成功！');
            location.reload();
        } else {
            console.log(data);
        }
    }).catch(function (error) {
        console.log(error);
    });
}
</script>
<template>
    <div class="content-form">
      <div class="form-item">
        <input type="text" class="form-input" id="input-name" v-model="editUser.name" placeholder="姓名"/>
      </div>
      <div class="form-item">
        <input type="text" class="form-input" id="input-phone" v-model="editUser.phone" placeholder="电话"/>
      </div>
      <div class="form-item">
        <input type="text" class="form-input" id="input-password" v-model="editUser.password" placeholder="密码(不少于8位)"/>
      </div>
      <div class="form-item">
        <select class="form-input" id="input-role" v-model="editUser.role">
          <option value="0" disabled selected>请选择角色</option>
          <option value="1">管理员</option>
          <option value="2">图书员</option>
        </select>
      </div>
      <div class="form-item">
        <button class="form-button" id="form-button" :data-id="editUser.id" @click="saveUser">保存</button>
      </div>
    </div>   
</template>
<style type="text/css" lang="less" scoped>
.form-item {
    margin: 20px 0;
}

.form-input {
    display: block;
    height: 40px;
    width: 400px;
    margin-bottom: 30px;
    padding-left: 0;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #000;
    background: transparent;
    color: #000;
    font-size: 14px;
    line-height: 1em;
    font-weight: normal;
}

.form-button {
    display: block;
    width: 400px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    border-radius: 20px;
    background-color: #000;
    color: #fff;
    font-size: 14px;
    border: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;
}

.form-input:focus {
    border-bottom: 2px solid #000;
}

.form-button:hover {
    font-weight: 600;
    background-color: #409eff;
}
</style>