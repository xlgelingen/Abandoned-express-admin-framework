<script setup>
import { reactive } from 'vue';
import roleService from '@/services/role';
import { useStore } from '@/stores/index.js';

const store = useStore();

var allPermissions = store.allPermissions;

const smsRules = {
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],

    slug: [
        { required: true, message: '请输入展示名称', trigger: 'blur' },
    ],

    desc: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ],

    permissions: [
        { required: true, message: '请选择权限', trigger: 'change' }
    ],
}

const formData = reactive({
    name: null,
    slug: null,
    desc: null,
    permissions: []
})

async function addRole() {
    if (!formData.name || !formData.slug || !formData.desc || !formData.permissions) {
        alert('params empty!')
    }
    console.log('allPermissions:',allPermissions)
    console.log("name: ", formData.name, "slug: ", formData.slug, "desc:", formData.desc, "permissions:", formData.permissions)
    try {
        const data = await roleService.addRole({
            name: formData.name,
            slug: formData.slug,
            describe: formData.desc,
            permissions: JSON.stringify(formData.permissions)
        });

        if (data.code === 200) {
            alert('添加成功！');
            location.reload();
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div class="content-form-wrapper">
        <div class="content-form">
            <el-form :model="formData" :rules="smsRules" status-icon>
                <el-form-item prop="name">
                    <el-input v-model="formData.name" type="text" placeholder="请输入用户名" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="slug">
                    <el-input v-model="formData.slug" type="text" placeholder="请输入展示名称" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item prop="desc">
                    <el-input v-model="formData.desc" type="textarea" placeholder="请输入描述" autocomplete="on" />
                </el-form-item>
                <el-form-item prop="permissions">
                    <el-checkbox-group v-model="formData.permissions" class="checkbox-grid">
                        <el-checkbox v-for="permission in allPermissions" :value="permission.id" name="type"
                            :key="permission.id">
                            {{ permission.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="addRole">新增</el-button>
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

.checkbox-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 10px;
}
</style>