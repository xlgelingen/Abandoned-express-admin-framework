<script setup>
import { ref} from 'vue';
import userService from '@/services/user';

var name = ref('');
var phone = ref('');
var password = ref('');
var role = ref('0');

async function addUser() {
    if(!name.value || !phone.value || !password.value || !role.value){
        alert('params empty!')
    }
    await userService.addUser({ name: name.value, phone: phone.value, password: password.value, role: role.value }).then(function (data) {
        if (data.code === 200) {
            alert('添加成功！');
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
    <div>
        <div class="content-form">
            <div class="form-item">
                <input type="text" class="form-input" id="input-name" v-model="name" placeholder="姓名" />
            </div>
            <div class="form-item">
                <input type="text" class="form-input" id="input-phone" v-model="phone" maxlength="11"
                    placeholder="电话" />
            </div>
            <div class="form-item">
                <input type="text" class="form-input" id="input-password" v-model="password" minlength="8"
                    placeholder="密码(不少于8位)" />
            </div>
            <div class="form-item">
                <select class="form-input" id="input-role" v-model="role">
                    <option value="0" disabled selected>请选择角色</option>
                    <option value="1">管理员</option>
                    <option value="2">图书员</option>
                </select>
            </div>
            <div class="form-item">
                <button class="form-button" id="form-button" @click="addUser">新增</button>
            </div>

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