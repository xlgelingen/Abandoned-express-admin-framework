<script setup>
import { useStore } from '@/stores/index.js';
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();
const usersAll = store.users;

const pageInfo = reactive({
    index: parseInt(route.query.page_index) || 1,
    size: parseInt(route.query.page_size) || 20
});

// 计算分页起始索引
const startIndex = computed(() => (pageInfo.index - 1) * pageInfo.size);

// 使用 slice 方法获取分页后的用户数组
const users = computed(() => usersAll.slice(startIndex.value, startIndex.value + pageInfo.size));

// 设置当前分页按钮的激活状态
const isActive1 = computed(() => pageInfo.index === 1);
const isActive2 = computed(() => pageInfo.index === 2);
const isActive3 = computed(() => pageInfo.index === 3);

</script>
<template>
        <div class="content-addUser">
            <router-link :to="{ name: 'UserCreate' }">新增用户 >></router-link>
        </div>
        <div class="content-table">
            <table class="table-container">
                <tr>
                    <th>姓名</th>
                    <th>电话</th>
                    <th>密码</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                <template v-for="user in users" :key="user.id">
                    <tr class="table-user">
                        <td>{{ user.name }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.password }}</td>
                        <td>{{ user.create_time }}</td>
                        <td><a class="user-edit" :data-id="user.id" :href="`/permission/manager/${user.id}/edit`">编辑</a>
                        </td>
                    </tr>
                </template>
            </table>
            <div class="table-pagination" id="table-pagination">
                <div class="pagination-index" id="pagination-index" :data-index="pageInfo.index" hidden></div>
                <a class="pagination-item" :class="{ 'active': isActive1 }" data-index="1"
                    href="?page_index=1&page_size=20">1</a>
                <a class="pagination-item" :class="{ 'active': isActive2 }" data-index="2"
                    href="?page_index=2&page_size=20">2</a>
                <a class="pagination-item" :class="{ 'active': isActive3 }" data-index="3"
                    href="?page_index=3&page_size=20">3</a>
            </div>
        </div>
</template>
<style type="text/css" lang="less" scoped>
.content-addUser {
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

.user-edit {
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

.table-pagination {
    display: flex;
    justify-content: center;
}

.pagination-item {
    display: block;
    color: #666;
    font-size: 14px;
    display: inline-block;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 99px;
    transition: background-color .2s;
}

.pagination-item:hover {
    background: #eaeaea;
}

.pagination-item.active {
    color: #fff;
    background: center center #666;
    background-size: 104% 104%;
}
</style>