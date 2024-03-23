import request from '@/utils/request.js'
import API from '@/consts/api.js'

const loginService = {
  login: (data,config) => {
    return request.post(API.login,data,config)
  },
  // logout: () => {
  //   return request.get(API.logout)
  // }
}

export default loginService