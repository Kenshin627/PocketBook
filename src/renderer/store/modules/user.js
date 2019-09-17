import { login, logout, getInfo } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'
import { isToday, isMonth } from '@/utils/util'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit, state }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((param) => {
          debugger
          state.token = 'temp'
          state.pocket.today = 0
          state.pocket.month = 0
          state.pocket.history = 0
          state.pocket.historyData = JSON.parse(param).userData
          state.pocket.historyData.map((item) => {
            state.pocket.history += item.money
          })
          state.pocket.todayData = state.pocket.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isToday(itemDate)) {
              return true
            }
          })
          state.pocket.todayData.map((item) => {
            state.pocket.today += item.money
          })
          state.pocket.monthData = state.pocket.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isMonth(itemDate)) {
              return true
            }
          })
          state.pocket.monthData.map((item) => {
            state.pocket.month += item.money
          })
          debugger
          resolve()
        }).catch(error => {
          console.log('error')
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
