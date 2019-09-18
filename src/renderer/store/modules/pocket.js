import { readFileByNode, isMonth, isToday } from '@/utils/util'

const pocket = {
  state: {
    todayData: [],
    today: 0,
    monthData: [],
    month: 0,
    historyData: [],
    history: 0,
    region: 0
  },
  mutations: {
    GET_POCKET_LIST: (state) => {
      readFileByNode().then((data) => {
        state.today = 0
        state.month = 0
        state.history = 0
        state.historyData = JSON.parse(data).userData
        state.historyData.map((item) => {
          state.history += item.money
        })
        state.todayData = state.historyData.filter((item) => {
          const itemDate = new Date(item.date)
          if (isToday(itemDate)) {
            return true
          }
        })
        state.todayData.map((item) => {
          state.today += item.money
        })
        state.monthData = state.historyData.filter((item) => {
          const itemDate = new Date(item.date)
          if (isMonth(itemDate)) {
            return true
          }
        })
        state.monthData.map((item) => {
          state.month += item.money
        })
      }).catch(() => {

      })
    }
  },
  actions: {
    init_Data({ commit }) {
      commit('GET_POCKET_LIST')
    }
  }
}
export default pocket
