<script setup>
import { ref, reactive, computed, onMounted,toRaw  } from 'vue';
import roleService from '@/services/role';
import { useRoute } from 'vue-router';
import { getEditRole } from '@/utils/role.js'
import { useStore } from '@/stores/index.js';

const store = useStore();

const route = useRoute();
const roleId = ref(route.params.id);

var permissions = store.allPermissions;

var editRole = reactive({});

onMounted(async () => {
    try {
        var roleInfo = await getEditRole({ id: roleId.value });
        Object.assign(editRole, roleInfo)
        console.log('角色编辑/ editRole', editRole);
    } catch (error) {
        console.error('获取编辑角色信息失败：', error);
    }
});

var idArr = computed(() => {
    const result = [false];
    var hasPermission = toRaw(editRole.permissions);
    var permissionsArr = toRaw(permissions)
    if (hasPermission) {
        console.log('hasPermission', hasPermission)
        console.log('permissionsArr.length', permissionsArr.length)
        for (var i = 0; i< permissionsArr.length; i++) {
            console.log('index:',i)
            if (hasPermission.includes(i + 1))
                result[i + 1] = true;
            else result[i + 1] = false;
        }
    }
    return result;
})

var permissionsIdFilter = computed(() => {
    var result = [];
    for (var index in idArr.value) {
        if (idArr.value[index]) {
            result.push(index)
        }
    }
    return result;
})

function show() {
    console.log('name:', editRole.name, 'slug: ', editRole.slug, 'describe:', editRole.describe)
    console.log('permissions：', permissions)
    console.log('idArr：', idArr.value)
    console.log('permissionsIdFilter.value:', permissionsIdFilter.value)
    console.log('permissions:', JSON.stringify(permissionsIdFilter.value))
}

async function saveRole() {
    if (!roleId.value || !editRole.name || !editRole.slug || !editRole.describe || !permissionsIdFilter.value) {
        alert('params empty!')
    }
    await roleService.editRole({ id: roleId.value, name: editRole.name, slug: editRole.slug, describe: editRole.describe, permissions: JSON.stringify(permissionsIdFilter.value) }).then(function (data) {
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
    <div @click="show">角色编辑页</div>
    <div class="content-form">
        <div class="form-item">
            <input type="text" class="form-input" id="input-name" v-model="editRole.name" placeholder="名称" />
        </div>
        <div class="form-item">
            <input type="text" class="form-input" id="input-slug" v-model="editRole.slug" placeholder="展示名称" />
        </div>
        <div class="form-item">
            <textarea class="form-textarea role-describe" id="input-describe" v-model="editRole.describe"
                placeholder="请输入描述～"></textarea>
        </div>
        <div v-for="permission in permissions" :key="permission.id" class="form-item  permission-box">
            <input type="checkbox" class='permission-item' :id="permission.id" name="checkbox"
                v-model="idArr[permission.id]">
            <label for="`${permission.id}`">{{ permission.name }}</label>
        </div>
        <div class="form-item">
            <button class="form-button" id="form-button" @click="saveRole">保存</button>
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

.form-textarea {
    display: block;
    width: 100%;
    margin-top: 10px;
    line-height: 20px;
    height: 80px;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    font-size: 14px;
}

.form-textarea.role-describe {
    width: 400px;
}

.form-textarea:focus {
    border: 1px solid #000;
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

.form-item.permission-box {
    padding: 0 10px;
    display: inline-block;
}
</style>