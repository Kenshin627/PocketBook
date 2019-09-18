import { login, getInfo } from '@/api/login'
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
    Login({ commit, state, rootState }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((param) => {
          state.token = 'temp'
          rootState.pocket.today = 0
          rootState.pocket.month = 0
          rootState.pocket.history = 0
          rootState.pocket.historyData = JSON.parse(param).userData
          rootState.pocket.historyData.map((item) => {
            rootState.pocket.history += item.money
          })
          rootState.pocket.todayData = rootState.pocket.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isToday(itemDate)) {
              return true
            }
          })
          rootState.pocket.todayData.map((item) => {
            rootState.pocket.today += item.money
          })
          rootState.pocket.monthData = rootState.pocket.historyData.filter((item) => {
            const itemDate = new Date(item.date)
            if (isMonth(itemDate)) {
              return true
            }
          })
          rootState.pocket.monthData.map((item) => {
            rootState.pocket.month += item.money
          })
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
        resolve()
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
