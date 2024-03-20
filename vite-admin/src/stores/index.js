import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      users: null,
      user: null,
      roles: null,
      permissions: ["role-index", "manager-index", "article-index", "article-category"],
      allPermissions:[]
    }
  },
  actions: {
    setUsers(usersInfo) {
      this.users= usersInfo
    },
    setUser(userInfo){
      this.user= userInfo
    },
    setRoles(rolesInfo){
      this.roles = rolesInfo
    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    setAllPermissions(permissions) {
      this.allPermissions = permissions
    }
  }
})

export default useStore
