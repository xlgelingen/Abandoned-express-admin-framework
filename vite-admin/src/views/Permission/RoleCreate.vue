<script setup>
import { ref, computed } from 'vue';
import roleService from '@/services/role';
import { useStore } from '@/stores/index.js';

const store = useStore();

var name = ref('');
var slug = ref('');
var describe = ref('');

var permissions = store.allPermissions;

var idArr = computed(() => {
    const result = [false];
    for (var key of permissions) {
        result[key.id] = false;
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

async function addRole() {
    if (!name.value || !slug.value || !describe.value || !permissionsIdFilter.value) {
        alert('params empty!')
    }
    // console.log('name:', name.value, 'slug: ', slug.value, 'describe:', describe.value)
    // console.log('permissions：',permissions)
    // console.log('idArr：',idArr.value)
    // console.log('permissionsIdFilter.value:', permissionsIdFilter.value)
    // console.log('permissions:', JSON.stringify(permissionsIdFilter.value))

    // await roleService.addRole({ name: name.value, slug: slug.value, describe: describe.value, permissions: JSON.stringify(permissionsIdFilter.value) }).then(function (data) {
    //     if (data.code === 200) {
    //         alert('添加成功！');
    //         location.reload();
    //     } else {
    //         console.log(data);
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
    try {
        const data = await roleService.addRole({
            name: name.value,
            slug: slug.value,
            describe: describe.value,
            permissions: JSON.stringify(permissionsIdFilter.value)
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
    <div>
        <div class="content-form">
            <div class="form-item">
                <input type="text" class="form-input" id="input-name" v-model="name" placeholder="名称" />
            </div>
            <div class="form-item">
                <input type="text" class="form-input" id="input-slug" v-model="slug" placeholder="展示名称" />
            </div>
            <div class="form-item">
                <textarea class="form-textarea role-describe" id="input-describe" v-model="describe"
                    placeholder="请输入描述～"></textarea>
            </div>
            <div v-for="permission in permissions" :key="permission.id" class="form-item  permission-box">
                <input type="checkbox" class='permission-item' :id="permission.id" name="checkbox"
                    v-model="idArr[permission.id]">
                <label for="`${permission.id}`">{{ permission.name }}</label>
            </div>
            <div class="form-item">
                <button class="form-button" id="form-button" @click="addRole">新增</button>
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