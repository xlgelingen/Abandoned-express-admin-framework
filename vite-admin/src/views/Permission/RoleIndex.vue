<script setup>
import { useStore } from '@/stores/index.js';

const store = useStore();
const rolesAll = store.roles;

</script>
<template>
    <div class="content-addRole">
        <router-link :to="{ name: 'RoleCreate' }">新增角色 >></router-link>
    </div>
    <div class="content-table">
        <table class="table-container">
            <tr>
                <th>名称</th>
                <th>展示名称</th>
                <th>描述</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
            <template v-for="role in rolesAll" :key="role.id">
                <tr class="table-role">
                    <td>{{ role.name }}</td>
                    <td>{{ role.slug }}</td>
                    <td>{{ role.describe }}</td>
                    <td>{{ role.create_time }}</td>
                    <td><a class="role-edit" :data-id="role.id" :href="`/permission/role/${role.id}/edit`">编辑</a>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>
<style type="text/css" lang="less" scoped>
.content-addRole {
    width: fit-content;
    margin: 10px 0;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        color: #409eff;
    }
}

.role-edit {
    color: #000;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: #409eff;
        font-weight: 600;
    }
}

.table-container {
    border-collapse: collapse;
    margin: 1rem 0;
    width: 100%;
}

.table-container tr {
    border-top: 1px solid #dfe2e5;
}

.table-container tr:nth-child(2n) {
    background-color: #f6f8fa;
}

.table-container th {
    font-style: 16px;
    font-weight: 600;
}

.table-container td,
.table-container th {
    border: 1px solid #dfe2e5;
    padding: .6em 1em;
}

.table-container tr td {
    color: #00000081;
    text-align: center;
}
</style>