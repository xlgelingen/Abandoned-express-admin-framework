<script setup>
import { reactive } from 'vue';
import userService from '@/services/user';

const smsRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '目前只支持中国大陆的手机号码',
            trigger: 'blur'
        }
    ],

    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: '密码不能少于8位，必须包含字母和数字，不能有特殊字符',
            trigger: 'blur'
        }
    ],

    role: [
        //指定在表单项的值发生变化时触发验证（trigger: 'change'）
        { required: true, message: '请选择角色', trigger: 'change' }
    ],
}

const formData = reactive({
    name: null,
    phone: null,
    password: null,
    role: null
})

async function addUser() {
    if (!formData.name || !formData.phone || !formData.password || !formData.role) {
        alert('params empty!')
    }
    console.log("name: ",formData.name, "phone: ",formData.phone, "password:", formData.password, "role:", formData.role )
    await userService.addUser({ name: formData.name, phone: formData.phone, password: formData.password, role: formData.role }).then(function (data) {
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
    <div class="content-form-wrapper">
        <div class="content-form">
            <el-form :model="formData" :rules="smsRules" status-icon>
                <el-form-item prop="name">
                    <el-input type="text" placeholder="请输入用户名" v-model="formData.name" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input type="number" placeholder="请输入手机号" v-model="formData.phone" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="text" placeholder="请输入密码" v-model="formData.password" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="role">
                    <el-select v-model="formData.role" placeholder="请选择角色" autocomplete="on">
                        <el-option label="管理员" value="1" />
                        <el-option label="图书员" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="addUser">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style type="text/css" lang="less" scoped>
.content-form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
}

.content-form {
    text-align: center;
    width: 400px;
    margin: 40px auto;
}
</style>